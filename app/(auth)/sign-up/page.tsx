"use client"

import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import InputField from '@/components/forms/InputField'
import SelectField from '@/components/forms/SelectField'
import FooterLink from "@/components/forms/FooterLink";
import {CountrySelectField} from '@/components/forms/CountrySelectField'
import {INVESTMENT_GOALS, PREFERRED_INDUSTRIES, RISK_TOLERANCE_OPTIONS} from "@/lib/constants";
import {signUpWithEmail} from "@/lib/actions/auth.actions";
import {useRouter} from "next/navigation";
import {toast} from "sonner";

export default function SignUp() {
  const router = useRouter()
  
  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm<SignUpFormData>({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      country: 'US',
      investmentGoals: 'Growth',
      riskTolerance: 'Medium',
      prefferedIndustry: 'Technology'
    },
    mode: 'onBlur'
  });
  
  const onSubmit = async (data: SignUpFormData) => {
    try {
      console.log(data)
      const result = await signUpWithEmail(data);
            if(result.success) router.push('/');
    } catch (e) {
      console.error(e)
      toast.error('Sign up failed', {
                description: e instanceof Error ? e.message : 'Failed to create an account.'
            })
        }
  }

  return (
    <div className="p-3">
      <h1 className="text-2xl my-5 text-center font-bold font-serif ">SignUp & Personalise</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <InputField
                    name="fullName"
                    label="Full Name"
                    placeholder="John Doe"
                    register={register}
                    error={errors.fullName}
                    validation={{ required: 'Full name is required', minLength: 2 }}
                />

                <InputField
                    name="email"
                    label="Email"
                    placeholder="contact@jsmastery.com"
                    register={register}
                    error={errors.email}
                    validation={{ required: 'Email name is required', value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email address is required' }}
                />

                <InputField
                    name="password"
                    label="Password"
                    placeholder="Enter a strong password"
                    type="password"
                    register={register}
                    error={errors.password}
                    validation={{ required: 'Password is required', minLength: { value: 8, message: 'Password must be at least 8 characters' }}}
                />
            
          <CountrySelectField 
            name="country"
            label="Country"
            control={control}
            error={errors.country}
            required
          />
            
          <SelectField
                    name="investmentGoals"
                    label="Investment Goals"
                    placeholder="Select your investment goal"
                    options={INVESTMENT_GOALS}
                    control={control}
                    error={errors.investmentGoals}
                    required
                />
                
          <SelectField
                    name="riskTolerance"
                    label="Risk Tolerance"
                    placeholder="Select your risk level"
                    options={RISK_TOLERANCE_OPTIONS}
                    control={control}
                    error={errors.riskTolerance}
                    required
                />
                
          <SelectField
                    name="prefferedIndustry"
                    label="Preferred Industry"
                    placeholder="Select your preferred industry"
                    options={PREFERRED_INDUSTRIES}
                    control={control}
                    error={errors.prefferedIndustry}
                    required
                />
        
        <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
          {isSubmitting ? "Creating Account..." : "Start Investment Journey"}
        </Button>
        <FooterLink text="Already have an account?" linkText="Sign in" href="/sign-in" />
      </form>
    </div>
    )
}