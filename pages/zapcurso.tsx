import { useEffect } from 'react';

export default function ZapCursoCheckout() {
  const checkoutUrl = 'https://app.abacatepay.com/pay/bill_Wq6RsHAAQ0dHCsrhnNhAc4xc';

  useEffect(() => {
    window.location.href = checkoutUrl;
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Redirecionando para o checkout seguro...</p>
    </div>
  );
}
