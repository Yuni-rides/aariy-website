import { Field, Input, Select } from "@/components/ui";
import { PROVINCES } from "@/lib/validation";

type AddressFieldsProps = {
  errors?: Record<string, string>;
  /** Previously submitted values, restored after a failed submit. */
  values?: Record<string, string>;
};

export function AddressFields({ errors = {}, values = {} }: AddressFieldsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <Field label="Full name" name="fullName" error={errors.fullName}>
          <Input name="fullName" autoComplete="name" required defaultValue={values.fullName} error={errors.fullName} />
        </Field>
      </div>
      <Field label="Mobile number" name="phone" error={errors.phone} hint="For delivery updates and COD confirmation">
        <Input
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="0300 1234567"
          required
          defaultValue={values.phone}
          error={errors.phone}
        />
      </Field>
      <Field label="Email (optional)" name="email" error={errors.email}>
        <Input name="email" type="email" autoComplete="email" defaultValue={values.email} error={errors.email} />
      </Field>
      <div className="sm:col-span-2">
        <Field label="Address" name="line1" error={errors.line1}>
          <Input
            name="line1"
            autoComplete="address-line1"
            placeholder="House, street, area"
            required
            defaultValue={values.line1}
            error={errors.line1}
          />
        </Field>
      </div>
      <div className="sm:col-span-2">
        <Field label="Apartment, landmark (optional)" name="line2">
          <Input name="line2" autoComplete="address-line2" defaultValue={values.line2} />
        </Field>
      </div>
      <Field label="City" name="city" error={errors.city}>
        <Input name="city" autoComplete="address-level2" required defaultValue={values.city} error={errors.city} />
      </Field>
      <Field label="Province" name="province" error={errors.province}>
        <Select name="province" autoComplete="address-level1" defaultValue={values.province ?? ""} required error={errors.province}>
          <option value="" disabled>
            Select province
          </option>
          {PROVINCES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </Select>
      </Field>
      <Field label="Postal code (optional)" name="postalCode">
        <Input name="postalCode" inputMode="numeric" autoComplete="postal-code" defaultValue={values.postalCode} />
      </Field>
    </div>
  );
}
