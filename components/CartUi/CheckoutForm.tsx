"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { states } from "@/lib/constant/NigeriaStates";
import { ShippingFormData } from "@/utils/types";
import formatCurrency from "@/utils/formatCurrency";
import { express, overnight, standard } from "@/lib/constant/conatant";

interface ShippingFormProps {
  formData: ShippingFormData;
  setFormData: React.Dispatch<React.SetStateAction<ShippingFormData>>;
  onSubmit: (e: React.FormEvent) => void;
  qualifiesForFreeShipping: boolean;
  freeShippingThreshold: number;
}

export function ShippingForm({
  formData,
  setFormData,
  onSubmit,
  qualifiesForFreeShipping,
  freeShippingThreshold,
}: ShippingFormProps) {
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <section className="bg-white rounded-lg border overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>

        <form className="space-y-6" onSubmit={onSubmit}>
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-medium mb-3">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name*</Label>
                <Input
                  id="fullname"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div>
            <h3 className="text-lg font-medium mb-3">Shipping Address</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Street Address *</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State *</Label>
                  <Select
                    value={formData.state}
                    onValueChange={(value) =>
                      handleSelectChange("state", value)
                    }
                  >
                    <SelectTrigger id="state">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map((state) => (
                        <SelectItem key={state.ISO} value={state.state_name}>
                          {state.state_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Method */}
          <div>
            <h3 className="text-lg font-medium mb-3">Shipping Method</h3>
            <RadioGroup
              value={formData.shippingMethod}
              onValueChange={(value) =>
                handleSelectChange("shippingMethod", value)
              }
              className="space-y-3"
            >
              <div
                className={`flex items-center justify-between rounded-lg border p-4 ${
                  formData.shippingMethod === "standard"
                    ? "border-pink-600 bg-pink-50"
                    : ""
                }`}
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="standard" id="standard" />
                  <Label
                    htmlFor="standard"
                    className="font-medium cursor-pointer"
                  >
                    Standard (3-5 business days)
                  </Label>
                </div>
                <div className="text-right">
                  {qualifiesForFreeShipping ? (
                    <span className="text-green-600 font-medium">Free</span>
                  ) : (
                    <span>{formatCurrency(standard)}</span>
                  )}
                </div>
              </div>

              <div
                className={`flex items-center justify-between rounded-lg border p-4 ${
                  formData.shippingMethod === "express"
                    ? "border-pink-600 bg-pink-50"
                    : ""
                }`}
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="express" id="express" />
                  <Label
                    htmlFor="express"
                    className="font-medium cursor-pointer"
                  >
                    Express (2-3 business days)
                  </Label>
                </div>
                <div>{formatCurrency(express)}</div>
              </div>

              <div
                className={`flex items-center justify-between rounded-lg border p-4 ${
                  formData.shippingMethod === "overnight"
                    ? "border-pink-600 bg-pink-50"
                    : ""
                }`}
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="overnight" id="overnight" />
                  <Label
                    htmlFor="overnight"
                    className="font-medium cursor-pointer"
                  >
                    Overnight (Next business day)
                  </Label>
                </div>
                <div>{formatCurrency(overnight)}</div>
              </div>
            </RadioGroup>

            {qualifiesForFreeShipping && (
              <p className="text-green-600 text-sm mt-2">
                You qualify for free standard shipping on orders over $
                {freeShippingThreshold}!
              </p>
            )}
          </div>

          {/* Terms and Conditions */}
          <div className="space-y-4">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="agreeToTerms"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, agreeToTerms: checked as boolean })
                }
                className="mt-1"
              />
              <Label htmlFor="agreeToTerms" className="text-sm cursor-pointer">
                I have read and agree to the Terms and Conditions, Privacy
                Policy, and Return Policy
              </Label>
            </div>
          </div>

          {/* Proceed to Payment Button */}
          <Button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 text-white py-6 text-lg"
            disabled={!formData.agreeToTerms}
          >
            Proceed to Payment
          </Button>

          <p className="text-center text-sm text-gray-500">
            By proceeding to payment, you agree to pay the total amount shown,
            including all applicable taxes and shipping charges.
          </p>
        </form>
      </div>
    </section>
  );
}
