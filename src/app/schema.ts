import { z } from "zod";

export const formSchema = z.object({
  country: z.string().min(2, "El país es requerido"),
  income: z.number({ invalid_type_error: "Debe ser un número" }).min(0, "Debe ser mayor o igual a 0"),
  monthlyExpenses: z.number({ invalid_type_error: "Debe ser un número" }).min(0, "Debe ser mayor o igual a 0").nullable(),
  monthlyDebtPayment: z.number({ invalid_type_error: "Debe ser un número" }).min(0).optional().nullable(),
  totalDebt: z.number({ invalid_type_error: "Debe ser un número" }).min(0).optional().nullable(),
  remainingInstallments: z.number({ invalid_type_error: "Debe ser un número" }).min(0).optional().nullable(),
  savings: z.number({ invalid_type_error: "Debe ser un número" }).min(0).optional(),
  financialGoal: z.string().min(3, "Selecciona una opción"),
  mainObstacle: z.string().min(3, "Este campo es requerido"),
  financialExperience: z.string().min(2, "Selecciona una opción"),
  customGoal: z.string().optional(),
});

export type FormData = z.infer<typeof formSchema>;