'use client'

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from 'next/navigation'
import { useState } from "react";

export default function PaypalButton() {
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)

    const initialOptions = {
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test",
        currency: "USD",
        intent: "capture",
    };

    return (
        <div className="w-full max-w-[300px] mx-auto relative z-20">
            {error && (
                <div className="mb-4 text-red-500 text-sm font-bold text-center bg-red-500/10 p-2 rounded">
                    {error}
                </div>
            )}
            <PayPalScriptProvider options={initialOptions}>
                <PayPalButtons
                    style={{
                        layout: "horizontal",
                        color: "gold",
                        shape: "pill",
                        label: "pay",
                        height: 50
                    }}
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    amount: {
                                        value: "1.00", // $1 USD
                                        currency_code: "USD"
                                    },
                                    description: "Heat Check Challenge Entry"
                                },
                            ],
                            intent: "CAPTURE"
                        });
                    }}
                    onApprove={async (data, actions) => {
                        if (actions.order) {
                            try {
                                const details = await actions.order.capture();
                                console.log("Transaction completed by " + details.payer?.name?.given_name);

                                // Record payment in database
                                await fetch('/api/record-payment', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        transaction_id: details.id,
                                        payer_name: (details.payer?.name?.given_name || '') + ' ' + (details.payer?.name?.surname || ''),
                                        payer_email: details.payer?.email_address,
                                        amount: details.purchase_units?.[0]?.amount?.value,
                                        currency: details.purchase_units?.[0]?.amount?.currency_code,
                                        status: details.status,
                                    }),
                                });

                                alert(`Transaction completed by ${details.payer?.name?.given_name}`);
                                router.push('/payment-success')
                            } catch (err) {
                                console.error("Payment capture failed", err);
                                setError("Payment failed during capture. Please try again.");
                            }
                        }
                    }}
                    onError={(err) => {
                        console.error("PayPal Checkout onError", err);
                        setError("Something went wrong with PayPal. Please try again.");
                    }}
                />
            </PayPalScriptProvider>
        </div>
    );
}
