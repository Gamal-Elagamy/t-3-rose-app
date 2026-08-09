'use client';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Field, FieldLabel, FieldGroup, FieldError } from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { updatePasswordSchema } from '../schemas/update-password.schema';
import { Button } from '@/shared/components/ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { signOut } from 'next-auth/react';
import { UpdatePasswordFormData } from '../types/account';
import useUpdatePassword from '../hooks/use-update-password';

export default function UpdatePasswordForm() {
  const { mutate: updatePassword, isPending, error } = useUpdatePassword();
  console.log(error);
  const [backendErrors, setBackendErrors] = useState<Array<{ path: string; message: string }>>([]);

  const form = useForm<UpdatePasswordFormData>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: UpdatePasswordFormData) => {
    setBackendErrors([]);
    updatePassword(data, {
      onSuccess: () => {
        toast.success('Your password has been updated. Please login again.');
        form.reset();
        signOut({ callbackUrl: '/login' });
      },
      onError: (error: unknown) => {
        if (Array.isArray(error)) {
          setBackendErrors(error);
        } else if (typeof error === 'string') {
          setBackendErrors([{ path: '', message: error }]);
        }
      },
    });
  };

  return (
    <div className="w-full">
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col font-geist-mono gap-4">
        {/* Current Password */}
        <FieldGroup>
          <Controller
            name="currentPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="currentPassword">Old Password</FieldLabel>
                <div className="relative">
                  <Input
                    {...field}
                    id="currentPassword"
                    type="password"
                    placeholder="********"
                    aria-invalid={fieldState.invalid}
                    className={fieldState.invalid ? 'border-destructive pr-10' : 'pr-10'}
                  />
                </div>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>

        <hr className="text-zinc-300 my-2" />

        {/* New Password */}
        <FieldGroup>
          <Controller
            name="newPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="newPassword">New Password</FieldLabel>
                <div className="relative">
                  <Input
                    {...field}
                    id="newPassword"
                    type="password"
                    placeholder="********"
                    aria-invalid={fieldState.invalid}
                    className={fieldState.invalid ? 'border-destructive pr-10' : 'pr-10'}
                  />
                </div>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>

        {/* Confirm New Password */}
        <FieldGroup>
          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="confirmPassword">Confirm New Password</FieldLabel>
                <Input
                  {...field}
                  id="confirmPassword"
                  type="password"
                  placeholder="********"
                  aria-invalid={fieldState.invalid}
                  className={fieldState.invalid ? 'border-destructive pr-10' : 'pr-10'}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>

        {/* Backend Validation Errors */}
        {backendErrors.length > 0 && (
          <div className="mt-6 bg-ds-bg-danger/10 border border-ds-border-danger/20 rounded-lg p-3">
            {backendErrors.map((err, index) => (
              <p key={index} className="text-sm text-ds-text-danger">
                {err.message}
              </p>
            ))}
          </div>
        )}

        {/* Update Password Button */}
        <Button
          type="submit"
          variant="default"
          className="mt-19 ml-auto w-57 py-3.5 px-4 rounded-xl"
          disabled={isPending}
        >
          {isPending ? <Loader2 className="w-5 h-5 animate-spin text-white" /> : 'Change Password'}
        </Button>
      </form>
    </div>
  );
}
