import { CtaButton } from "@/components/analytics/CtaButton";
import { Section } from "@/components/ui/Section";
import { precio } from "@/content/precio";
import { tipografia } from "@/lib/typography";

function Check() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="mt-1 h-[13px] w-[13px] flex-none text-azul">
      <path d="M3 8.5l3.5 3.5L13 5" />
    </svg>
  );
}

export function Precios() {
  return (
    <Section background="fondo" id="precios">
      <p className={`max-w-[20ch] ${tipografia.h2}`}>{precio.titulo}</p>
      <p className={`mt-4 max-w-[48ch] ${tipografia.cuerpo} text-gris`}>{precio.apoyo}</p>

      <div className="mt-14 grid items-stretch gap-5 lg:grid-cols-3">
        {precio.planes.map((plan) => (
          <article
            key={plan.nombre}
            className={`flex flex-col gap-4 rounded-card border p-7 ${
              plan.destacado
                ? "border-azul/45 bg-superficie-alta shadow-[0_0_0_1px_rgba(37,99,235,.18)]"
                : "border-linea/10 bg-superficie"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className={tipografia.h3}>{plan.nombre}</h3>
              {"badge" in plan && plan.badge && (
                <span className="rounded-[5px] border border-azul/40 bg-azul/[0.14] px-2 py-0.5 text-[0.6875rem] text-azul-suave">
                  {plan.badge}
                </span>
              )}
            </div>
            <div className="flex items-baseline gap-1.5 tracking-[-0.04em]">
              <span className={plan.periodo === null ? "text-[1.85rem] font-light" : "text-[2.4rem] font-light leading-none"}>
                {plan.monto}
              </span>
              {plan.periodo && <span className="text-xs tracking-normal text-gris">{plan.periodo}</span>}
            </div>
            <p className="-mt-2 text-xs text-gris">{plan.para}</p>
            <ul className="grid gap-3 text-xs leading-[1.5] text-gris">
              {plan.incluye.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <Check />
                  {item}
                </li>
              ))}
            </ul>
            <CtaButton
              href={plan.cta.href}
              section="precios"
              label={plan.cta.label}
              variant={plan.destacado ? "primary" : "secondary"}
              className="mt-auto w-full justify-center"
            />
          </article>
        ))}
      </div>
      <p className="mt-8 text-xs text-gris">{precio.notaMeta}</p>
    </Section>
  );
}
