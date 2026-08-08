import { z } from 'zod';

import { addressSchema } from '../schemas/address.schema';

export interface IAddress {
  id: string;
  userId: string;
  title: string;
  isPrimary: boolean;
  city: string;
  street: string;
  phone: string;
  latitude: string;
  longitude: string;
  createdAt: string;
  updatedAt: string;
}

export interface AddAddressPayload {
  address: IAddress;
}

export type AddressFormValues = z.infer<typeof addressSchema>;

export interface AddAddressRequest extends AddressFormValues {
  latitude: number;
  longitude: number;
}