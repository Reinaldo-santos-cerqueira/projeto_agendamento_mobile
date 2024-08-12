import {formatCPF, isValidCPF} from '@utils';
import {z} from 'zod';

const loginSchema = z.object({
  cpf: z
    .string()
    .refine(isValidCPF, {
      message: 'CPF inválido',
    })
    .transform(formatCPF),
  password: z
    .string()
    .min(10, 'A senha deve ter pelo menos 10 caracteres.')
    .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula.')
    .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula.')
    .regex(/\d/, 'A senha deve conter pelo menos um número.')
    .regex(
      /[@$!%*?&#]/,
      'A senha deve conter pelo menos um caractere especial.',
    ),
});

export {loginSchema};
export type LoginSchema = z.infer<typeof loginSchema>;
