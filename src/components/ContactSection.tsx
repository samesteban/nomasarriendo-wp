import { useEffect, useRef, useState, type FormEvent } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Mail, MessageCircle, Phone, Send } from "lucide-react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          size?: "invisible";
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        },
      ) => string;
      reset: (widgetId: string) => void;
      execute: (widgetId: string) => void;
    };
  }
}

type ContactSectionProps = {
  title?: string;
  subtitle?: string;
  whatsapp?: string;
  whatsappUrl?: string;
  email?: string;
  phone?: string;
  hours?: string | { dia?: string; hora?: string }[];
  hoursGuarantee?: string;
  privacyNoteTitle?: string;
  privacyNote?: string;
};

export function ContactSection({
  title,
  subtitle,
  whatsapp,
  whatsappUrl,
  email,
  phone,
  hours,
  hoursGuarantee,
  privacyNoteTitle,
  privacyNote,
}: ContactSectionProps) {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    rut: "",
    region: "",
    comuna: "",
    asunto: "",
    telefono: "",
    correo: "",
    comentarios: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const turnstileRef = useRef<HTMLDivElement | null>(null);
  const turnstileWidgetId = useRef<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [pendingSubmit, setPendingSubmit] = useState(false);

  const formatRut = (value: string) => {
    const cleaned = value.replace(/[^0-9kK]/g, "").toUpperCase();
    if (!cleaned) return "";
    const body = cleaned.slice(0, -1);
    const dv = cleaned.slice(-1);
    const reversed = body.split("").reverse();
    const withDots = reversed
      .map((char, index) => (index > 0 && index % 3 === 0 ? `${char}.` : char))
      .reverse()
      .join("");
    return body ? `${withDots}-${dv}` : dv;
  };

  const isValidRut = (value: string) => {
    const cleaned = value.replace(/[^0-9kK]/g, "").toUpperCase();
    if (cleaned.length < 2) return false;
    const body = cleaned.slice(0, -1);
    const dv = cleaned.slice(-1);
    if (!/^\d+$/.test(body)) return false;
    let sum = 0;
    let multiplier = 2;
    for (let i = body.length - 1; i >= 0; i -= 1) {
      sum += Number(body[i]) * multiplier;
      multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }
    const remainder = 11 - (sum % 11);
    const computed =
      remainder === 11 ? "0" : remainder === 10 ? "K" : String(remainder);
    return dv === computed;
  };

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (!digits) return "";
    const normalized = digits.startsWith("56") ? digits : `56${digits}`;
    const country = "+56";
    const rest = normalized.slice(2);
    const first = rest.slice(0, 1);
    const mid = rest.slice(1, 5);
    const last = rest.slice(5, 9);
    const parts = [country, first, mid, last].filter(Boolean);
    return parts.join(" ").trim();
  };

  const regiones = [
    "Arica y Parinacota",
    "Tarapaca",
    "Antofagasta",
    "Atacama",
    "Coquimbo",
    "Valparaiso",
    "Metropolitana",
    "O'Higgins",
    "Maule",
    "Nuble",
    "Biobio",
    "Araucania",
    "Los Rios",
    "Los Lagos",
    "Aysen",
    "Magallanes",
  ];

  const asuntos = [
    "Primera asesoria gratuita",
    "Informacion sobre el proceso",
    "Consulta sobre requisitos",
    "Revision de mi situacion financiera",
    "Agendar reunion presencial",
    "Otros",
  ];

  const submitForm = () => {
    setIsSubmitting(true);

    const payload = new FormData();
    payload.append("nombre", formData.nombre);
    payload.append("apellido", formData.apellido);
    payload.append("rut", formData.rut);
    payload.append("region", formData.region);
    payload.append("comuna", formData.comuna);
    payload.append("asunto", formData.asunto);
    payload.append("telefono", formData.telefono);
    payload.append("correo", formData.correo);
    payload.append("comentarios", formData.comentarios);
    payload.append("cf-turnstile-response", turnstileToken);

    fetch(
      "https://wp.nomasarriendo.cl/wp-json/contact-form-7/v1/contact-forms/164/feedback",
      {
        method: "POST",
        headers: { Accept: "application/json" },
        body: payload,
      },
    )
      .then(async (response) => {
        if (!response.ok) {
          const text = await response.text();
          throw new Error(text || "Error al enviar el formulario.");
        }
        return response.json();
      })
      .then((data: { status?: string; message?: string }) => {
        if (data.status === "mail_sent") {
          setSubmitMessage("¡Gracias por tu interés! Te contactaremos pronto.");
          setFormData({
            nombre: "",
            apellido: "",
            rut: "",
            region: "",
            comuna: "",
            asunto: "",
            telefono: "",
            correo: "",
            comentarios: "",
          });
        } else {
          setSubmitMessage(
            data.message ||
              "No se pudo enviar el formulario. Intenta de nuevo.",
          );
        }
      })
      .catch(() => {
        setSubmitMessage("No se pudo enviar el formulario. Intenta de nuevo.");
      })
      .finally(() => {
        setIsSubmitting(false);
        setPendingSubmit(false);
        setTurnstileToken("");
        if (window.turnstile && turnstileWidgetId.current) {
          window.turnstile.reset(turnstileWidgetId.current);
        }
      });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setSubmitMessage(null);
    if (!isValidRut(formData.rut)) {
      setSubmitMessage("Por favor ingresa un RUT válido.");
      return;
    }
    if (!formData.telefono || formData.telefono.length < 8) {
      setSubmitMessage("Por favor ingresa un teléfono válido.");
      return;
    }
    if (!turnstileToken) {
      setPendingSubmit(true);
      if (window.turnstile && turnstileWidgetId.current) {
        window.turnstile.execute(turnstileWidgetId.current);
        return;
      }
      setSubmitMessage("Captcha aún no está listo. Intenta nuevamente.");
      return;
    }
    submitForm();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const resolvedTitle = title || "¡Analicemos tu caso!";
  const resolvedSubtitle =
    subtitle ||
    "Completa el formulario y te contactaremos para evaluar tu situacion sin ningun costo";
  const resolvedWhatsapp = whatsapp || "+56 9 1234 5678";
  const resolvedWhatsappUrl =
    whatsappUrl ||
    (resolvedWhatsapp
      ? `https://wa.me/${resolvedWhatsapp.replace(/\D/g, "")}`
      : "");
  const resolvedEmail = email || "contacto@nomasarriendo.cl";
  const resolvedPhone = phone || "+56 2 2345 6789";
  const resolvedHours = hours || "";
  const resolvedHoursText =
    typeof resolvedHours === "string" ? resolvedHours : "";
  const resolvedHoursGuarantee =
    hoursGuarantee ||
    "Respuesta garantizada: Te contactaremos dentro de las proximas 24 horas habiles.";
  const resolvedPrivacyNoteTitle =
    privacyNoteTitle || "Tu privacidad es importante";
  const resolvedPrivacyNote =
    privacyNote ||
    "Todos tus datos son tratados de forma confidencial y solo seran utilizados para contactarte y evaluar tu caso. No compartimos informacion con terceros.";

  useEffect(() => {
    if (!turnstileRef.current) return;

    const renderWidget = () => {
      if (!turnstileRef.current || !window.turnstile) return;
      if (turnstileWidgetId.current) return;

      turnstileWidgetId.current = window.turnstile.render(
        turnstileRef.current,
        {
          sitekey: "0x4AAAAAACZVXJynMwwtsllP",
          size: "invisible",
          callback: (token: string) => {
            setTurnstileToken(token);
          },
          "expired-callback": () => {
            setTurnstileToken("");
          },
          "error-callback": () => {
            setTurnstileToken("");
          },
        },
      );
    };

    if (window.turnstile) {
      renderWidget();
      return;
    }

    const existingScript = document.querySelector(
      'script[data-turnstile-script="true"]',
    );
    if (!existingScript) {
      const script = document.createElement("script");
      script.src =
        "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.dataset.turnstileScript = "true";
      script.onload = renderWidget;
      document.body.appendChild(script);
    } else {
      existingScript.addEventListener("load", renderWidget);
    }
  }, []);

  useEffect(() => {
    if (!pendingSubmit || !turnstileToken || isSubmitting) return;
    submitForm();
  }, [pendingSubmit, turnstileToken, isSubmitting]);

  return (
    <section id="contacto" className="py-16 lg:py-24 bg-brand-cream">
      <div className="container px-6 mx-auto lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">
              {resolvedTitle}
            </h2>
            <p className="max-w-3xl mx-auto text-xl text-gray-600">
              {resolvedSubtitle}
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Info Row */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="nombre">Nombre *</Label>
                      <Input
                        id="nombre"
                        required
                        value={formData.nombre}
                        onChange={(e) =>
                          handleInputChange("nombre", e.target.value)
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="apellido">Apellido *</Label>
                      <Input
                        id="apellido"
                        required
                        value={formData.apellido}
                        onChange={(e) =>
                          handleInputChange("apellido", e.target.value)
                        }
                        className="mt-1"
                      />
                    </div>
                  </div>

                  {/* RUT */}
                  <div>
                    <Label htmlFor="rut">RUT *</Label>
                    <Input
                      id="rut"
                      required
                      placeholder="12.345.678-9"
                      value={formData.rut}
                      onChange={(e) =>
                        handleInputChange("rut", formatRut(e.target.value))
                      }
                      className="mt-1"
                    />
                  </div>

                  {/* Location Row */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="region">Region *</Label>
                      <Select
                        onValueChange={(value) =>
                          handleInputChange("region", value)
                        }
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Selecciona tu region" />
                        </SelectTrigger>
                        <SelectContent>
                          {regiones.map((region) => (
                            <SelectItem key={region} value={region}>
                              {region}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="comuna">Comuna *</Label>
                      <Input
                        id="comuna"
                        required
                        placeholder="Ej: Las Condes, Providencia..."
                        value={formData.comuna}
                        onChange={(e) =>
                          handleInputChange("comuna", e.target.value)
                        }
                        className="mt-1"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <Label htmlFor="asunto">Motivo de consulta *</Label>
                    <Select
                      onValueChange={(value) =>
                        handleInputChange("asunto", value)
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="¿En que podemos ayudarte?" />
                      </SelectTrigger>
                      <SelectContent>
                        {asuntos.map((asunto) => (
                          <SelectItem key={asunto} value={asunto}>
                            {asunto}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Contact Info Row */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="telefono">Telefono *</Label>
                      <Input
                        id="telefono"
                        type="tel"
                        required
                        placeholder="+56 9 1234 5678"
                        value={formData.telefono}
                        onChange={(e) =>
                          handleInputChange(
                            "telefono",
                            formatPhone(e.target.value),
                          )
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="correo">Correo electronico *</Label>
                      <Input
                        id="correo"
                        type="email"
                        required
                        value={formData.correo}
                        onChange={(e) =>
                          handleInputChange("correo", e.target.value)
                        }
                        className="mt-1"
                      />
                    </div>
                  </div>

                  {/* Comments */}
                  <div>
                    <Label htmlFor="comentarios">Comentarios adicionales</Label>
                    <Textarea
                      id="comentarios"
                      placeholder="Cuentanos mas sobre tu situacion actual, tus objetivos, presupuesto estimado, etc."
                      value={formData.comentarios}
                      onChange={(e) =>
                        handleInputChange("comentarios", e.target.value)
                      }
                      className="mt-1 min-h-[120px]"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-center">
                    <div ref={turnstileRef} />
                  </div>

                  {submitMessage ? (
                    <p className="text-sm text-center text-gray-600">
                      {submitMessage}
                    </p>
                  ) : null}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full py-4 text-lg font-semibold text-white transition-all duration-200 shadow-lg bg-brand-brown hover:bg-brand-brown-dark hover:shadow-xl"
                    disabled={isSubmitting}
                  >
                    <Send className="w-5 h-5 mr-2" />
                    {isSubmitting ? "Enviando..." : "Enviar solicitud"}
                  </Button>

                  <p className="text-sm text-center text-gray-500">
                    * Campos obligatorios. Al enviar este formulario aceptas que
                    te contactemos para evaluar tu caso.
                  </p>
                </form>
              </Card>
            </div>

            {/* Contact Info Sidebar */}
            <div className="space-y-6">
              {/* Quick Contact */}
              <Card className="p-6">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">
                  Contacto directo
                </h3>

                <div className="space-y-4">
                  <a
                    href={resolvedWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-4 transition-colors duration-200 border border-green-200 rounded-lg bg-green-50 hover:bg-green-100"
                  >
                    <MessageCircle className="w-6 h-6 mr-3 text-green-600" />
                    <div>
                      <div className="font-semibold text-gray-900">
                        WhatsApp
                      </div>
                      <div className="text-sm text-gray-600">
                        {resolvedWhatsapp}
                      </div>
                    </div>
                  </a>

                  <a
                    href={`mailto:${resolvedEmail}`}
                    className="flex items-center p-4 transition-colors duration-200 border rounded-lg bg-brand-beige border-brand-tan hover:bg-brand-tan"
                  >
                    <Mail className="w-6 h-6 mr-3 text-brand-brown" />
                    <div>
                      <div className="font-semibold text-gray-900">Email</div>
                      <div className="text-sm text-gray-600">
                        {resolvedEmail}
                      </div>
                    </div>
                  </a>

                  <div className="flex items-center p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <Phone className="w-6 h-6 mr-3 text-gray-600" />
                    <div>
                      <div className="font-semibold text-gray-900">
                        Telefono
                      </div>
                      <div className="text-sm text-gray-600">
                        {resolvedPhone}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Business Hours */}
              <Card className="p-6">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">
                  Horarios de atencion
                </h3>

                {Array.isArray(resolvedHours) && resolvedHours.length ? (
                  <div className="space-y-2 text-sm text-gray-600">
                    {resolvedHours.map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <span>{item.dia}</span>
                        <span className="font-medium">{item.hora}</span>
                      </div>
                    ))}
                  </div>
                ) : resolvedHoursText ? (
                  <div className="text-sm text-gray-600 whitespace-pre-line">
                    {resolvedHoursText}
                  </div>
                ) : (
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Lunes - Viernes:</span>
                      <span className="font-medium">9:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sabados:</span>
                      <span className="font-medium">10:00 - 14:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Domingos:</span>
                      <span className="font-medium">Cerrado</span>
                    </div>
                  </div>
                )}

                <div className="p-3 mt-4 rounded-lg bg-brand-beige">
                  <p className="text-xs text-brand-brown-dark">
                    {resolvedHoursGuarantee}
                  </p>
                </div>
              </Card>

              {/* Privacy Note */}
              <Card className="gap-1 p-6 border-gray-200 bg-gray-50">
                <h3 className="mb-1 text-lg font-semibold text-gray-900">
                  {resolvedPrivacyNoteTitle}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  {resolvedPrivacyNote}
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
