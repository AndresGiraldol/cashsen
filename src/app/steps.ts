import CurrencyInput from "./components/inputs/CurrencyInput";
import InputText from "./components/inputs/InputText";
import InputNumberWithUnknown from "./components/inputs/NumberInputWithUnknown";
import SelectInput from "./components/inputs/SelectInput";

import { ComponentType } from "react";

export type StepConfig = {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  helptext?: string;
  options?: string[];         
  isCurrency?: boolean; 
  component: ComponentType<any>;
}

export const steps: StepConfig[] = [
  {
    id: "country",
    label: "¿En qué país vives?",
    type: "text",
    placeholder: "Ej: Colombia, Chile, México, etc.",
    helptext: "Adaptaremos tu plan al contexto de tu país.",
    component: InputText,
  },
  {
    id: "income",
    label: "¿Cuánto ganas al mes en promedio?",
    type: "number",
    placeholder: "$",
    helptext: "Si tienes ingresos variables, usa un promedio estimado de tus ingresos de los últimos 3 a 6 meses.",
    component: CurrencyInput,
  },
  {
    id: "monthlyExpenses",
    label: "¿Cuánto gastas mensualmente (en promedio)?",
    type: "number",
    placeholder: "$",
    helptext: "Suma todo lo que gastas al mes en cosas básicas como arriendo, servicios, comida y transporte.",
    isCurrency: true,
    component: InputNumberWithUnknown,
  },
  {
    id: "monthlyDebtPayment",
    label: "¿Cuánto pagas mensualmente en deudas?",
    type: "number",
    placeholder: "$",
    helptext: "Incluye el pago mensual de todas tus deudas: créditos, tarjetas, etc.",
    isCurrency: true,
    component: InputNumberWithUnknown,
  },
  {
    id: "totalDebt",
    label: "¿Cuánto debes en total (si lo sabes)?",
    type: "number",
    placeholder: "$",
    helptext: "Suma total de todas tus deudas (si la sabes).",
    isCurrency: true,
    component: InputNumberWithUnknown,
  },
  {
    id: "remainingInstallments",
    label: "¿Cuántas cuotas te faltan por pagar (aproximadamente)?",
    type: "number",
    placeholder: "Número de cuotas",
    helptext: "Si no estás seguro, puedes marcar 'No lo sé'.",
    component: InputNumberWithUnknown,
  },
  {
    id: "savings",
    label: "¿Cuánto tienes ahorrado actualmente?",
    type: "number",
    placeholder: "$",
    isCurrency: true,
    component: CurrencyInput,
  },
  {
    id: "financialGoal",
    label: "¿Cuál es tu principal objetivo financiero en este momento?",
    type: "select",
    options: [
      "Ahorrar para algo específico",
      "Salir de deudas",
      "Aprender a organizarme",
      "Empezar a invertir",
      "Otro",
    ],
    placeholder: "",
    component: SelectInput,
  },
  {
    id: "mainObstacle",
    label: "¿Qué crees que te está frenando más para lograrlo?",
    type: "text",
    placeholder: "Escribe tu respuesta",
    helptext: "Por ejemplo: gastos inesperados, falta de disciplina, deudas, etc. Si no sabes, puedes decirlo. Sé lo más específico posible.",
    component: InputText,
  },
  {
    id: "financialExperience",
    label: "¿Qué tanto sientes que sabes sobre finanzas personales?",
    type: "select",
    options: [
      "Muy poco, casi nada",
      "Sé lo básico",
      "Tengo conocimientos intermedios",
      "Soy bastante experto",
    ],
    placeholder: "",
    component: SelectInput,
  },
];