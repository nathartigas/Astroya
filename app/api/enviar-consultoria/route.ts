import nodemailer from 'nodemailer';

interface FormData {
  nome: string;
  email: string;
  empresa: string;
  telefone: string;
  segmento: string;
  possuiSite: string;
  linkSite: string;
  objetivo: string;
  outroObjetivo: string;
  servicos: string;
  identidadeVisual: string;
  publicoAlvo: string;
  referencia: string;
  fase: string;
  dificuldades: string;
}

export async function POST(request: Request) {
  try {
    const MAX_PAYLOAD_SIZE = 1048576; // 1MB

    // Verifica o tamanho do payload
    const contentLength = Number(request.headers.get('content-length') || 0);
    if (contentLength > MAX_PAYLOAD_SIZE) {
      return new Response(JSON.stringify({ success: false, message: 'Payload muito grande' }), { status: 413 });
    }

    // Lê e valida o corpo
    const formData: FormData = await request.json();

    // Validação dos campos obrigatórios
    const requiredFields: (keyof FormData)[] = ['nome', 'email', 'empresa', 'telefone'];
    for (const field of requiredFields) {
      if (!formData[field] || formData[field].trim() === '') {
        return new Response(JSON.stringify({ success: false, message: `O campo ${field} é obrigatório` }), { status: 400 });
      }
    }

    // Validação de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return new Response(JSON.stringify({ success: false, message: 'E-mail inválido' }), { status: 400 });
    }

    // Configuração do Nodemailer (exemplo com Gmail)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // HTML para Astroya (empresa)
    const professionalEmailHtml = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Nova Consultoria - ${formData.empresa}</title>
</head>
<body style="font-family: Arial, sans-serif; background: #F9F5FF; margin:0; padding:0;">
  <div style="max-width:600px;margin:20px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,0.08);">
    <div style="background: linear-gradient(135deg, #9200BE, #AD33D1); padding:32px 20px; color:#fff; text-align:center;">
      <h1 style="margin:0;font-size:24px;font-weight:600;letter-spacing:0.5px;">NOVA CONSULTORIA DE LANDING PAGE</h1>
      <h2 style="margin:8px 0 0;font-size:18px;font-weight:400;opacity:0.9;">${formData.empresa}</h2>
    </div>
    <div style="padding:32px;">
      <div style="margin-bottom:28px;padding-bottom:28px;border-bottom:1px solid #eee;">
        <h3 style="color:#9200BE;font-size:18px;font-weight:600;margin-bottom:16px;">Informações do Cliente</h3>
        <div style="display:grid;grid-template-columns:130px 1fr;gap:12px 16px;margin-bottom:8px;">
          <span style="font-weight:500;color:#6A6A6A;font-size:14px;">Nome:</span>
          <span style="color:#0F0A15;font-size:15px;">${formData.nome}</span>
          <span style="font-weight:500;color:#6A6A6A;font-size:14px;">E-mail:</span>
          <span style="color:#0F0A15;font-size:15px;">${formData.email}</span>
          <span style="font-weight:500;color:#6A6A6A;font-size:14px;">Telefone:</span>
          <span style="color:#0F0A15;font-size:15px;">${formData.telefone}</span>
          <span style="font-weight:500;color:#6A6A6A;font-size:14px;">Segmento:</span>
          <span style="color:#0F0A15;font-size:15px;">${formData.segmento}</span>
        </div>
      </div>
      <div style="margin-bottom:28px;padding-bottom:28px;border-bottom:1px solid #eee;">
        <h3 style="color:#9200BE;font-size:18px;font-weight:600;margin-bottom:16px;">Presença Online</h3>
        <div style="display:grid;grid-template-columns:130px 1fr;gap:12px 16px;margin-bottom:8px;">
          <span style="font-weight:500;color:#6A6A6A;font-size:14px;">Possui site?</span>
          <span style="color:#0F0A15;font-size:15px;">${formData.possuiSite === 'sim' ? 'Sim' : 'Não'}</span>
          ${formData.possuiSite === 'sim' ? `
          <span style="font-weight:500;color:#6A6A6A;font-size:14px;">Link do site:</span>
          <span style="color:#0F0A15;font-size:15px;">${formData.linkSite || 'Não informado'}</span>
          ` : ''}
          <span style="font-weight:500;color:#6A6A6A;font-size:14px;">Objetivo:</span>
          <span style="color:#0F0A15;font-size:15px;">${formData.objetivo === 'outro' ? formData.outroObjetivo : formData.objetivo}</span>
        </div>
      </div>
      <div style="margin-bottom:28px;padding-bottom:28px;border-bottom:1px solid #eee;">
        <h3 style="color:#9200BE;font-size:18px;font-weight:600;margin-bottom:16px;">Serviços/Produtos</h3>
        <div style="background:#F9F5FF;border-left:4px solid #FF5500;padding:16px;border-radius:0 8px 8px 0;margin:16px 0;font-size:15px;line-height:1.7;">
          ${formData.servicos.replace(/\n/g, '<br>')}
        </div>
      </div>
      <div style="margin-bottom:28px;padding-bottom:28px;border-bottom:1px solid #eee;">
        <h3 style="color:#9200BE;font-size:18px;font-weight:600;margin-bottom:16px;">Detalhes do Projeto</h3>
        <div style="display:grid;grid-template-columns:130px 1fr;gap:12px 16px;margin-bottom:8px;">
          <span style="font-weight:500;color:#6A6A6A;font-size:14px;">Identidade Visual:</span>
          <span style="color:#0F0A15;font-size:15px;">${formData.identidadeVisual}</span>
          <span style="font-weight:500;color:#6A6A6A;font-size:14px;">Fase da Empresa:</span>
          <span style="color:#0F0A15;font-size:15px;">${formData.fase}</span>
        </div>
      </div>
      <div style="margin-bottom:28px;padding-bottom:28px;border-bottom:1px solid #eee;">
        <h3 style="color:#9200BE;font-size:18px;font-weight:600;margin-bottom:16px;">Público-Alvo</h3>
        <div style="background:#F9F5FF;border-left:4px solid #FF5500;padding:16px;border-radius:0 8px 8px 0;margin:16px 0;font-size:15px;line-height:1.7;">
          ${formData.publicoAlvo.replace(/\n/g, '<br>')}
        </div>
      </div>
      ${formData.referencia ? `
      <div style="margin-bottom:28px;padding-bottom:28px;border-bottom:1px solid #eee;">
        <h3 style="color:#9200BE;font-size:18px;font-weight:600;margin-bottom:16px;">Referências</h3>
        <div style="background:#F9F5FF;border-left:4px solid #FF5500;padding:16px;border-radius:0 8px 8px 0;margin:16px 0;font-size:15px;line-height:1.7;">
          ${formData.referencia.replace(/\n/g, '<br>')}
        </div>
      </div>
      ` : ''}
      <div style="margin-bottom:28px;">
        <h3 style="color:#9200BE;font-size:18px;font-weight:600;margin-bottom:16px;">Dificuldades</h3>
        <div style="background:#F9F5FF;border-left:4px solid #FF5500;padding:16px;border-radius:0 8px 8px 0;margin:16px 0;font-size:15px;line-height:1.7;">
          ${formData.dificuldades.replace(/\n/g, '<br>')}
        </div>
      </div>
      <div style="margin-top:32px;text-align:center;color:#6A6A6A;font-size:12px;">
        Enviado em ${new Date().toLocaleString('pt-BR')}
      </div>
    </div>
    <div style="text-align:center;padding:24px;background-color:#0F0A15;color:rgba(255,255,255,0.7);font-size:12px;">
      <div style="font-weight:700;color:#fff;font-size:18px;margin-bottom:8px;letter-spacing:1px;">ASTROYA</div>
      <p><a href="https://astroya-br.vercel.app/" style="color:#fff;text-decoration:none;">astroya.com.br</a> | <a href="mailto:astroya.br@gmail.com" style="color:#fff;text-decoration:none;">astroya.br@gmail.com</a></p>
    </div>
  </div>
</body>
</html>
`;

    // HTML para o cliente
    const clientConfirmationHtml = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Recebemos sua solicitação!</title>
</head>
<body style="font-family: Arial, sans-serif; background: #F9F5FF; margin:0; padding:20px;">
  <div style="max-width:600px;margin:20px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,0.08);">
    <div style="background: linear-gradient(135deg, #9200BE, #AD33D1); padding:40px 20px; color:#fff; text-align:center;">
      <h1 style="margin:0;font-size:28px;font-weight:600;letter-spacing:0.5px;">OBRIGADO POR ENTRAR EM CONTATO!</h1>
      <p style="margin:8px 0 0;font-size:16px;opacity:0.9;">Estamos analisando sua solicitação de consultoria</p>
    </div>
    <div style="padding:32px;">
      <div style="font-size:20px;margin-bottom:24px;color:#0F0A15;font-weight:500;">Olá, ${formData.nome}!</div>
      <div style="margin-bottom:24px;font-size:15px;color:#6A6A6A;line-height:1.8;">
        Recebemos sua solicitação de consultoria para criação de Landing Page e estamos muito felizes com seu interesse em nossos serviços. Na Astroya, estamos comprometidos em ajudar seu negócio a decolar no mundo digital.
      </div>
      <div style="text-align:center;margin:32px 0;">
        <span style="font-size:64px;display:inline-block;">🚀</span>
      </div>
      <div style="margin-bottom:24px;font-size:15px;color:#6A6A6A;line-height:1.8;">
        Nossa equipe já está analisando as informações que você nos enviou e em breve entraremos em contato para dar sequência ao seu atendimento e discutir como podemos criar uma solução perfeita para suas necessidades.
      </div>
      <div style="background-color:#F9F5FF;border-radius:12px;padding:24px;margin:32px 0;border:1px solid #eee;">
        <div style="color:#9200BE;font-size:18px;font-weight:600;margin-bottom:20px;text-align:center;text-transform:uppercase;letter-spacing:1px;">Resumo do seu envio</div>
        <div style="display:flex;margin-bottom:12px;">
          <div style="font-weight:500;min-width:120px;color:#6A6A6A;font-size:14px;">Empresa:</div>
          <div style="color:#0F0A15;font-size:15px;font-weight:500;">${formData.empresa}</div>
        </div>
        <div style="display:flex;margin-bottom:12px;">
          <div style="font-weight:500;min-width:120px;color:#6A6A6A;font-size:14px;">Telefone:</div>
          <div style="color:#0F0A15;font-size:15px;font-weight:500;">${formData.telefone}</div>
        </div>
        <div style="display:flex;margin-bottom:12px;">
          <div style="font-weight:500;min-width:120px;color:#6A6A6A;font-size:14px;">Segmento:</div>
          <div style="color:#0F0A15;font-size:15px;font-weight:500;">${formData.segmento}</div>
        </div>
        <div style="display:flex;margin-bottom:12px;">
          <div style="font-weight:500;min-width:120px;color:#6A6A6A;font-size:14px;">Objetivo:</div>
          <div style="color:#0F0A15;font-size:15px;font-weight:500;">${formData.objetivo === 'outro' ? formData.outroObjetivo : formData.objetivo}</div>
        </div>
      </div>
      <div style="text-align:center;margin:40px 0 32px;">
        <a href="https://astroya-br.vercel.app/" style="display:inline-block;background:linear-gradient(135deg,#9200BE,#AD33D1);color:white;text-decoration:none;padding:14px 32px;border-radius:50px;font-weight:600;font-size:16px;">CONHEÇA MAIS SOBRE NOSSO TRABALHO</a>
      </div>
      <div style="text-align:center;margin:32px 0;">
        <a href="https://instagram.com/astroya.br" style="margin:0 12px;color:#9200BE;text-decoration:none;font-weight:600;font-size:14px;">Instagram</a>
        <a href="https://www.linkedin.com/in/astroya-brasil-836a90366/" style="margin:0 12px;color:#9200BE;text-decoration:none;font-weight:600;font-size:14px;">LinkedIn</a>
        <a href="https://tiktok.com/@astroya.br" style="margin:0 12px;color:#9200BE;text-decoration:none;font-weight:600;font-size:14px;">TikTok</a>
      </div>
      <div style="margin-top:32px;border-top:1px solid #eee;padding-top:24px;text-align:center;">
        <p style="margin:4px 0;font-size:14px;">Atenciosamente,</p>
        <p style="margin:4px 0;font-size:14px;"><strong style="color:#9200BE;font-weight:600;">Equipe Astroya</strong></p>
        <p style="margin:4px 0;font-size:14px;">Soluções Digitais que Impulsionam seu Negócio</p>
        <p style="margin:4px 0;font-size:14px;">✉️ astroya.br@gmail.com</p>
      </div>
    </div>
    <div style="text-align:center;padding:24px;background-color:#0F0A15;color:rgba(255,255,255,0.7);font-size:12px;">
      <div style="font-weight:700;color:#fff;font-size:18px;margin-bottom:8px;letter-spacing:1px;">ASTROYA</div>
      <p>© ${new Date().getFullYear()} Astroya. Todos os direitos reservados.</p>
      <p><a href="https://astroya-br.vercel.app/" style="color:#fff;text-decoration:none;">Visite nosso site</a> | <a href="mailto:astroya.br@gmail.com" style="color:#fff;text-decoration:none;">Entre em contato</a></p>
    </div>
  </div>
</body>
</html>
`;

    // Envio do e-mail para a empresa
    await transporter.sendMail({
      from: `"Astroya" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `Nova Consultoria de Landing Page - ${formData.empresa}`,
      html: professionalEmailHtml,
    });

    // Envio do e-mail de confirmação para o cliente
    await transporter.sendMail({
      from: `"Astroya" <${process.env.EMAIL_USER}>`,
      to: formData.email,
      subject: "Recebemos sua solicitação de consultoria 🚀",
      html: clientConfirmationHtml,
    });

    // Resposta de sucesso
    return new Response(JSON.stringify({
      success: true,
      message: 'Formulário enviado com sucesso!',
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    // Tratamento de erros
    const message = error.message || 'Erro ao processar a requisição';
    console.error('Erro no envio:', message, error);
    return new Response(JSON.stringify({
      success: false,
      message,
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}