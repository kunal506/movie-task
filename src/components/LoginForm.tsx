'use client';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/button';
import CustomCheckbox from '@/components/common/customChecbox';
import validator from 'validator';
import Input from '@/components/common/input';
import { errorToast, successToast } from '@/lib/helper';

const LoginForm = () => {
  const router = useRouter();
  const initialValues = { email: '', password: '' };
  const [formData, setFormdata] = useState(initialValues);
  const [errors, setErrors] = useState(initialValues);
  const [isRememberChecked, setIsRememberChecked] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormdata({
      ...formData,
      [name]: value,
    });

    if (name === 'email' && !validator.isEmail(value)) {
      setErrors({
        ...errors,
        email: 'Please enter valid email',
      });
    } else {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors = { ...initialValues };

    if (!formData.email) {
      newErrors.email = 'Please enter registered email';
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'Please enter valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Please enter password';
    }

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      const payload = {
        email: formData.email,
        password: formData.password,
        rememberMe: isRememberChecked,
      };

      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const data = await response.json();
          router.push('/');
          successToast(data?.message);
        } else {
          const errorData = await response.json();

          errorToast(errorData?.error);
        }
      } catch (error) {
        errorToast('Something went wrong');
      }
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center flex-col">
      <div className="md:w-[300px] w-full text-center">
        <h1 className="md:text-heading-one text-heading-two font-semibold">
          Sign in
        </h1>

        <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
          <Input
            placeholder="Email"
            type="text"
            name="email"
            value={formData.email}
            error={errors.email}
            onChange={handleChange}
            autoFocus={true}
            autoComplete="off"
          />

          <Input
            placeholder="Password"
            type="password"
            name="password"
            value={formData.password}
            error={errors.password}
            onChange={handleChange}
            autoComplete="off"
          />

          <div className="flex items-center justify-center">
            <CustomCheckbox
              label="Remember me"
              isChecked={isRememberChecked}
              onChange={() => setIsRememberChecked(!isRememberChecked)}
            />
          </div>

          <div>
            <Button type="submit">Login</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
