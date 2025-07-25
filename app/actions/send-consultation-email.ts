'use server';

import * as functions from 'firebase-functions';
import nodemailer from 'nodemailer';
import type { ConsultationFormValues } from '@/components/feature/consultation-modal';
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale';
import { attemptToBookSlot, getUnavailableSlotsForDate } from './schedule-manager';

// Função para formatar data e hora para o padrão ICS (YYYYMMDDTHHmmssZ)
function formatDateToICS(date: Date, time: string): string {
  const [hours, minutes] = time.split(':').map(Number);
  const combinedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes);
  return combinedDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

function generateICSContent(data: ConsultationFormValues, eventDurationHours: number = 1): string {
  const {
    clientName,
    companyName,
    clientEmail,
    companyWebsite,
    mainChallenge,
    targetAudience,
    serviceLandingPage,
    serviceSEO,
    serviceMaintenance,
    preferredDate,
    preferredTime,
  } = data;

  const startDateICS = formatDateToICS(preferredDate, preferredTime);
  const [hours, minutes] = preferredTime.split(':').map(Number);
  const endDate = new Date(preferredDate.getFullYear(), preferredDate.getMonth(), preferredDate.getDate(), hours + eventDurationHours, minutes);
  const endDateICS = formatDateToICS(endDate, `${String(endDate.getHours()).padStart(2, '0')}:${String(endDate.getMinutes()).padStart(2, '0')}`);

  const timestamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const uid = `${timestamp}-${clientEmail.replace(/[@.]/g, '')}@astroya.com.br`;

  const servicesList = [
    serviceLandingPage && "Criação de Landing Pages",
    serviceSEO && "Otimização SEO",
    serviceMaintenance && "Manutenção Contínua",
  ].filter(Boolean).join(', ');
  const servicesText = servicesList.length > 0 ? servicesList : 'Nenhum serviço específico selecionado';

  const description = `Solicitação de Consultoria Astroya:
Nome do Solicitante: ${clientName}
Empresa: ${companyName}
E-mail: ${clientEmail}
Website: ${companyWebsite || 'Não informado'}
Principal Desafio: ${mainChallenge}
Público-Alvo: ${targetAudience}
Serviços de Interesse: ${servicesText}
Horário Solicitado: ${format(preferredDate, "PPP", { locale: ptBR })} às ${preferredTime}`;

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Astroya//Agendamento//PT
CALSCALE:GREGORIAN
BEGIN:VEVENT
UID:${uid}
DTSTAMP:${timestamp}
DTSTART:${startDateICS}
DTEND:${endDateICS}
SUMMARY:Consultoria Astroya: ${companyName} (${clientName})
DESCRIPTION:${description.replace(/\n/g, '\\n')}
LOCATION:Online / Videoconferência
ORGANIZER;CN="Astroya":MAILTO:${process.env.EMAIL_FROM || process.env.EMAIL_USER}
ATTENDEE;CN="${clientName}";ROLE=REQ-PARTICIPANT:MAILTO:${clientEmail}
STATUS:TENTATIVE
SEQUENCE:0
END:VEVENT
END:VCALENDAR`;
}

export async function sendConsultationEmailAction(data: ConsultationFormValues) {
  const {
    clientName,
    companyName,
    clientEmail,
    companyWebsite,
    mainChallenge,
    targetAudience,
    serviceLandingPage,
    serviceSEO,
    serviceMaintenance,
    preferredDate,
    preferredTime,
  } = data;

  // Lê as variáveis do Firebase Functions config
const emailUser = process.env.EMAIL_USER || "";
const emailPass = process.env.EMAIL_PASS || "";
const emailTo = process.env.EMAIL_TO || emailUser;
const emailHost = process.env.EMAIL_HOST || "";
const emailPort = process.env.EMAIL_PORT || "465";
const emailSecure = process.env.EMAIL_SECURE === "true" || true;
const emailFrom = process.env.EMAIL_FROM || emailUser;

  // Log para debug
  console.log('EMAIL CONFIG', { emailUser, emailPass, emailTo, emailHost, emailPort, emailSecure, emailFrom });
  if (!emailUser || !emailPass || !emailHost || !emailPort) {
    throw new Error('Email service not configured. Missing one or more ENV VARS.');
  }

  // Configura o Nodemailer
  const transporter = nodemailer.createTransport({
    host: emailHost,
    port: Number(emailPort || 587),
    secure: emailSecure,
    auth: {
      user: emailUser,
      pass: emailPass,
    },
    tls: {
      rejectUnauthorized: process.env.NODE_ENV === 'production'
    }
  });

  const formattedDate = format(preferredDate, "PPP", { locale: ptBR });
  const servicesList = [
    serviceLandingPage && "Criação de Landing Pages de Alta Conversão",
    serviceSEO && "Otimização SEO para Melhor Visibilidade",
    serviceMaintenance && "Manutenção Contínua e Suporte Técnico",
  ].filter(Boolean);

  const servicesText = servicesList.length > 0 ? servicesList.join(', ') : 'Nenhum serviço específico selecionado';
  const firstName = clientName.split(' ')[0];

  const icsContent = generateICSContent(data);
  const icsAttachment = {
    filename: 'convite_consultoria_astroya.ics',
    content: icsContent,
    contentType: 'text/calendar; charset=utf-8; method=REQUEST',
  };

  const adminMailOptions = {
    from: `"Astroya Agendamentos" <${emailFrom}>`,
    to: emailTo,
    subject: `Nova Solicitação de Consultoria Astroya: ${companyName} (Solicitante: ${clientName})`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
            <h2 style="color: #FF5500; border-bottom: 2px solid #9200BE; padding-bottom: 10px;">Nova Solicitação de Consultoria Recebida</h2>
            <p>Uma nova solicitação de consultoria foi feita através do site Astroya.</p>
            <p>Um convite de calendário (.ics) está anexado a este e-mail para fácil adição à sua agenda.</p>
            <h3 style="color: #8A2BE2; margin-top: 25px;">Detalhes da Solicitação:</h3>
            <ul style="list-style-type: none; padding-left: 0;">
              <li style="margin-bottom: 8px;"><strong>Nome do Solicitante:</strong> ${clientName}</li>
              <li style="margin-bottom: 8px;"><strong>Empresa:</strong> ${companyName}</li>
              <li style="margin-bottom: 8px;"><strong>E-mail do Solicitante:</strong> ${clientEmail}</li>
              <li style="margin-bottom: 8px;"><strong>Website:</strong> ${companyWebsite ? `<a href="${companyWebsite}" style="color: #FF5500;">${companyWebsite}</a>` : 'Não informado'}</li>
              <li style="margin-bottom: 8px;"><strong>Principal Desafio/Objetivo:</strong> ${mainChallenge}</li>
              <li style="margin-bottom: 8px;"><strong>Público-Alvo:</strong> ${targetAudience}</li>
              <li style="margin-bottom: 8px;"><strong>Serviços de Interesse:</strong> ${servicesText}</li>
              <li style="margin-bottom: 8px;"><strong>Data e Horário Preferidos:</strong> ${formattedDate} às ${preferredTime}</li>
            </ul>
            <p style="margin-top: 25px;"><strong>Próximos Passos:</strong></p>
            <p>Por favor, entre em contato com o solicitante através do e-mail <a href="mailto:${clientEmail}" style="color: #FF5500;">${clientEmail}</a> para confirmar o agendamento e alinhar os detalhes da consultoria.</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="font-size: 0.9em; color: #777;">Este é um e-mail automático enviado pelo sistema de agendamento da Astroya.</p>
        </div>
      </div>
    `,
    attachments: [icsAttachment]
  };

  const clientMailOptions = {
    from: `"Astroya" <${emailFrom}>`,
    to: clientEmail,
    subject: `Confirmação de Solicitação de Consultoria - Astroya`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
            <h2 style="color: #FF5500; border-bottom: 2px solid #9200BE; padding-bottom: 10px;">Olá ${firstName}, sua solicitação foi recebida!</h2>
            <p>Obrigado por entrar em contato com a Astroya e solicitar uma consultoria estratégica gratuita.</p>
            <p>Recebemos seus dados e entraremos em contato em breve para confirmar o agendamento e discutir os próximos passos.</p>
            <p>Enviamos um convite de calendário (.ics) anexado a este e-mail para sua conveniência. Por favor, adicione-o à sua agenda.</p>
            <h3 style="color: #8A2BE2; margin-top: 25px;">Detalhes da sua Solicitação:</h3>
            <ul style="list-style-type: none; padding-left: 0;">
              <li style="margin-bottom: 8px;"><strong>Nome:</strong> ${clientName}</li>
              <li style="margin-bottom: 8px;"><strong>Empresa:</strong> ${companyName}</li>
              ${companyWebsite ? `<li style="margin-bottom: 8px;"><strong>Website:</strong> ${companyWebsite}</li>` : ''}
              <li style="margin-bottom: 8px;"><strong>Data e Horário Solicitados:</strong> ${formattedDate} às ${preferredTime}</li>
              <li style="margin-bottom: 8px;"><strong>Serviços de Interesse:</strong> ${servicesText}</li>
            </ul>
            <p style="margin-top: 25px;"><strong>O que acontece agora?</strong></p>
            <p>Nossa equipe analisará sua solicitação e entrará em contato com você pelo e-mail <strong>${clientEmail}</strong> para confirmar o horário e prepará-lo para nossa conversa.</p>
            <p>Enquanto isso, sinta-se à vontade para explorar mais sobre nossos serviços em nosso site.</p>
            <p style="margin-top: 25px;">Atenciosamente,</p>
            <p style="font-weight: bold; color: #FF5500;">Equipe Astroya</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="font-size: 0.9em; color: #777;">Este é um e-mail de confirmação automático. Se você não solicitou esta consultoria, por favor, ignore este e-mail.</p>
        </div>
      </div>
    `,
    attachments: [icsAttachment]
  };

  try {
    const dateStr = format(preferredDate, 'yyyy-MM-dd');
    console.log(`[SendEmailAction] Attempting to book for: ${dateStr} ${preferredTime}`);
    // Verifica a disponibilidade antes de tentar "reservar" e enviar e-mails
    const currentUnavailableSlots = await getUnavailableSlotsForDate(dateStr);
    if (currentUnavailableSlots.includes(preferredTime)) {
      console.log(`[SendEmailAction] Pre-check failed: Slot ${dateStr} ${preferredTime} already unavailable.`);
      return { success: false, message: 'Este horário foi reservado ou tornou-se indisponível enquanto você preenchia o formulário. Por favor, escolha outro.' };
    }
    // Tenta "reservar" o slot na memória
    const slotBookedSuccessfully = await attemptToBookSlot(dateStr, preferredTime);
    console.log(`[SendEmailAction] Result of attemptToBookSlot for ${dateStr} ${preferredTime}: ${slotBookedSuccessfully}`);
    if (!slotBookedSuccessfully) {
      console.log(`[SendEmailAction] attemptToBookSlot returned false for ${dateStr} ${preferredTime}. This means it was already booked or made unavailable by a rule.`);
      return { success: false, message: 'Este horário não está disponível para agendamento. Por favor, tente outro.' };
    }
    // Se o slot foi "reservado" com sucesso, prossiga com o envio dos e-mails
    await transporter.sendMail(adminMailOptions);
    console.log(`[SendEmailAction] Admin email sent for ${dateStr} ${preferredTime}.`);
    await transporter.sendMail(clientMailOptions);
    console.log(`[SendEmailAction] Client email sent for ${dateStr} ${preferredTime}.`);
    return { success: true, message: 'Sua solicitação foi enviada! Enviamos um e-mail de confirmação com um convite de calendário para você.' };
  } catch (error: any) {
    console.error("[SendEmailAction] Falha ao enviar e-mail de consultoria ou erro no processo:", error);
    let detailedMessage = 'Houve um problema ao enviar sua solicitação. Por favor, tente novamente ou entre em contato diretamente.';
    if (error.responseCode) {
      detailedMessage += ` (Código do erro SMTP: ${error.responseCode})`;
    } else if (error.code) { 
      detailedMessage += ` (Código Nodemailer: ${error.code})`;
    }
    return { success: false, message: detailedMessage };
  }
}
