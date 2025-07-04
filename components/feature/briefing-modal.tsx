"use client";

import { useState, type ReactNode } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Briefcase, Mail, Loader2, Building, Target, Palette, CheckSquare, BotMessageSquare, Link } from "lucide-react";
import { cn } from '@/lib/utils';

const briefingFormSchema = z.object({
  brandName: z.string().min(2, { message: "O nome da marca deve ter pelo menos 2 caracteres." }),
  pageObjective: z.string({ required_error: "Por favor, selecione um objetivo." }),
  otherObjective: z.string().optional(),
  offerDescription: z.string().min(10, { message: "A descrição deve ter pelo menos 10 caracteres." }),
  existingAssets: z.array(z.string()).optional(),
  visualStyle: z.string({ required_error: "Por favor, selecione um estilo visual." }),
  otherVisualStyle: z.string().optional(),
  extraFeatures: z.array(z.string()).optional(),
  otherExtraFeature: z.string().optional(),
  contactEmail: z.string().email({ message: "Por favor, insira um e-mail válido." }),
  comments: z.string().optional(),
});

export type BriefingFormValues = z.infer<typeof briefingFormSchema>;

interface BriefingModalProps {
  children: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  priceId?: string | null;
}

export function BriefingModal({ children, open, onOpenChange, priceId }: BriefingModalProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<BriefingFormValues>({
    resolver: zodResolver(briefingFormSchema),
    defaultValues: {
      brandName: "",
      pageObjective: "",
      otherObjective: "",
      offerDescription: "",
      existingAssets: [],
      visualStyle: "",
      otherVisualStyle: "",
      extraFeatures: [],
      otherExtraFeature: "",
      contactEmail: "",
      comments: "",
    },
  });

  async function onSubmit(values: BriefingFormValues) {
    setIsLoading(true);
    console.log("Briefing submitted:", values);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsLoading(false);
    toast({
      title: "Briefing Enviado!",
      description: "Obrigado por preencher. Agora vamos para o pagamento.",
    });

    // Redirect to Stripe
    if (priceId) {
      try {
        const stripeResponse = await fetch('/api/stripe/create-checkout-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ priceId, briefing: values }), // Pass briefing data
        });

        const stripeData = await stripeResponse.json();

        if (stripeData.url) {
          window.location.href = stripeData.url;
        } else if (stripeData.error) {
          toast({
            title: "Erro no Pagamento",
            description: stripeData.error,
            variant: "destructive",
          });
        }
      } catch (stripeError) {
        console.error("Erro ao iniciar o checkout do Stripe:", stripeError);
        toast({
          title: "Erro no Pagamento",
          description: "Não foi possível iniciar o processo de pagamento. Tente novamente.",
          variant: "destructive",
        });
      }
    }
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] w-[95vw] max-h-[90vh] overflow-y-auto p-4">
        <DialogHeader className="p-6 pb-4 bg-card/80 rounded-t-lg">
          <DialogTitle className="text-2xl font-headline gradient-text-animated flex items-center">
            <Briefcase className="mr-3 h-7 w-7 text-primary" />
            Briefing para sua Landing Page
          </DialogTitle>
          <DialogDescription className="text-foreground/70">
            Preencha as informações abaixo para começarmos a criar sua página.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6">
            <FormField
              control={form.control}
              name="brandName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center"><Building className="mr-2 h-4 w-4" />Nome da sua marca ou projeto</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Astroya" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pageObjective"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center"><Target className="mr-2 h-4 w-4" />Qual o principal objetivo da sua landing page?</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="space-y-2">
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="vender" />
                        </FormControl>
                        <FormLabel className="font-normal">Vender um produto</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="captar" />
                        </FormControl>
                        <FormLabel className="font-normal">Captar contatos (leads)</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="agendamento" />
                        </FormControl>
                        <FormLabel className="font-normal">Agendamento de serviços</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="evento" />
                        </FormControl>
                        <FormLabel className="font-normal">Divulgação de evento</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="outro" />
                        </FormControl>
                        <FormLabel className="font-normal">Outro</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="offerDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center"><BotMessageSquare className="mr-2 h-4 w-4" />Descrição curta do que você oferece</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Descreva seu produto, serviço ou causa." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="existingAssets"
              render={() => (
                <FormItem>
                  <FormLabel className="flex items-center"><CheckSquare className="mr-2 h-4 w-4" />Você já tem algum desses itens?</FormLabel>
                  <div className="space-y-2">
                    {['logo', 'identidade', 'textos', 'imagens', 'nenhum'].map((item) => (
                      <FormField
                        key={item}
                        control={form.control}
                        name="existingAssets"
                        render={({ field }) => {
                          return (
                            <FormItem key={item} className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...(field.value || []), item])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {item === 'logo' && 'Logo'}
                                {item === 'identidade' && 'Identidade visual (cores/fontes)'}
                                {item === 'textos' && 'Textos prontos'}
                                {item === 'imagens' && 'Imagens ou vídeos para a página'}
                                {item === 'nenhum' && 'Nenhum ainda, preciso de ajuda'}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="visualStyle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center"><Palette className="mr-2 h-4 w-4" />Qual estilo visual você prefere para sua página?</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="space-y-2">
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="moderno" />
                        </FormControl>
                        <FormLabel className="font-normal">Moderno e limpo</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="criativo" />
                        </FormControl>
                        <FormLabel className="font-normal">Criativo e colorido</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="elegante" />
                        </FormControl>
                        <FormLabel className="font-normal">Elegante e sofisticado</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="minimalista" />
                        </FormControl>
                        <FormLabel className="font-normal">Minimalista</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="outro" />
                        </FormControl>
                        <FormLabel className="font-normal">Outro</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="extraFeatures"
              render={() => (
                <FormItem>
                  <FormLabel className="flex items-center"><CheckSquare className="mr-2 h-4 w-4" />Você gostaria de incluir alguma das opções abaixo?</FormLabel>
                  <div className="space-y-2">
                    {['whatsapp', 'formulario', 'redes', 'contador'].map((item) => (
                      <FormField
                        key={item}
                        control={form.control}
                        name="extraFeatures"
                        render={({ field }) => {
                          return (
                            <FormItem key={item} className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...(field.value || []), item])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {item === 'whatsapp' && 'Botão de WhatsApp'}
                                {item === 'formulario' && 'Formulário de contato'}
                                {item === 'redes' && 'Link para redes sociais'}
                                {item === 'contador' && 'Contador de tempo (urgência)'}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center"><Mail className="mr-2 h-4 w-4" />Qual o seu e-mail para receber atualizações do projeto?</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="seu.email@exemplo.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="comments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center"><Link className="mr-2 h-4 w-4" />Quer deixar algum comentário, link de referência ou observação? (Opcional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Cole links ou deixe suas observações aqui." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
              <DialogClose asChild>
                <Button type="button" variant="outline" className="w-full sm:w-auto" disabled={isLoading}>
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="w-full sm:w-auto gradient-bg text-primary-foreground font-semibold hover:opacity-90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "Enviar briefing e continuar com o pagamento"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
