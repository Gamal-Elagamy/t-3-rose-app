'use client';

import { Field, FieldError, FieldGroup, FieldLabel } from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { useEffect } from 'react';
import { ProductFormData } from '../../types/products';

export default function PriceInputs() {
  // Form Context
  const { control, setValue } = useFormContext<ProductFormData>();

  // Form Watche
  const listPrice = useWatch({ control, name: 'listPrice' });
  const discountValue = useWatch({ control, name: 'discountValue' });
  const discountType = useWatch({ control, name: 'discountType' });

  // Effects
  useEffect(() => {
    const listPriceNum = parseFloat(listPrice) || 0;
    const discountNum = parseFloat(discountValue ?? '') || 0;

    let priceAfterDiscount = listPriceNum;

    if (discountNum > 0) {
      if (discountType === 'PERCENT') {
        priceAfterDiscount = listPriceNum - (listPriceNum * discountNum) / 100;
      } else {
        priceAfterDiscount = listPriceNum - discountNum;
      }
    }

    if (priceAfterDiscount < 0) priceAfterDiscount = 0;

    setValue('price', priceAfterDiscount.toFixed(2), { shouldValidate: true });
  }, [listPrice, discountValue, discountType, setValue]);

  return (
    <div className="flex flex-col gap-2.5 md:flex-row md:items-start">
      {/* Price */}
      <FieldGroup className="flex-1">
        <Controller
          name="listPrice"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="listPrice">
                Price <span className="text-ds-text-danger">*</span>
              </FieldLabel>
              <Input
                {...field}
                id="listPrice"
                aria-invalid={fieldState.invalid}
                type="number"
                min={0}
                step="0.01"
                placeholder="Example: 5000"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      {/* Discount Value */}
      <FieldGroup className="flex-1">
        <Controller
          name="discountValue"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="discountValue">Discount</FieldLabel>
              <Input
                {...field}
                id="discountValue"
                aria-invalid={fieldState.invalid}
                type="number"
                min={0}
                step="0.01"
                placeholder="Example: 5"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      {/* Price After Discount */}
      <FieldGroup className="flex-1">
        <Controller
          name="price"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="price">Price after discount</FieldLabel>
              <Input
                {...field}
                id="price"
                aria-invalid={fieldState.invalid}
                type="number"
                disabled
                placeholder="Example: 5"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
    </div>
  );
}
