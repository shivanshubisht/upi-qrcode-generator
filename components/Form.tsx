'use client';
import { useRef, useState } from 'react';
import QRCode from 'qrcode';
import Image from 'next/image';

const Form = () => {
  const merchant = useRef<HTMLInputElement>(null);
  const paymentType = useRef<HTMLSelectElement>(null);
  const upi = useRef<HTMLInputElement>(null);
  const amount = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLInputElement>(null);
  const currency = useRef<HTMLSelectElement>(null);

  const [input, setInput] = useState<JSX.Element | null>(null);

  const account = useRef<HTMLInputElement>(null);
  const ifsc = useRef<HTMLInputElement>(null);
  const aadhaar = useRef<HTMLInputElement>(null);
  const mobile = useRef<HTMLInputElement>(null);

  // const [image, setImage] = useState<Promise<string>>(Promise.resolve(''));
  const [image, setImage] = useState<string>('');
  const defaultImage =
    'data:image/png;base64,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';

  const generateQRCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const descriptionConcat = description.current?.value.split(' ').join('%20');
    // const qrcode = `upi://pay?pa=${upi.current?.value}&pn=${merchant.current?.value}&am=${amount.current?.value}&tn=${descriptionConcat}&cu=${currency.current?.value}`;
    let qrcode = '';

    switch (paymentType.current?.value) {
      // change qrcode syntax based on payment type
      case 'upi':
        qrcode = `upi://pay?pa=${upi.current?.value}&pn=${merchant.current?.value}&am=${amount.current?.value}&tn=${descriptionConcat}&cu=${currency.current?.value}`;
        break;
      case 'account':
        qrcode = `upi://pay?pa=${account.current?.value}@${ifsc.current?.value}.ifsc.npci&pn=${merchant.current?.value}&am=${amount.current?.value}&tn=${descriptionConcat}&cu=${currency.current?.value}`;
        break;
      case 'aadhaar':
        qrcode = `upi://pay?pa=${aadhaar.current?.value}@aadhaar.npci&pn=${merchant.current?.value}&am=${amount.current?.value}&tn=${descriptionConcat}&cu=${currency.current?.value}`;
        break;
      case 'mobile':
        qrcode = `upi://pay?pa=${mobile.current?.value}@mobile.npci&pn=${merchant.current?.value}&am=${amount.current?.value}&tn=${descriptionConcat}&cu=${currency.current?.value}`;
        break;
      default:
        break;
    }
    // console.log(qrcode);
    // console.log(paymentType.current?.value);
    // image.current = await QRCode.toDataURL(qrcode);
    // console.log(image.current);
    setImage(await QRCode.toDataURL(qrcode));
  };

  return (
    <div className='flex flex-wrap justify-center md:flex-nowrap gap-8 w-full'>
      <form
        onChange={generateQRCode}
        onSubmit={generateQRCode}
        className='grid gap-2 w-full max-w-sm'
      >
        <input
          type='text'
          placeholder='Merchant / Payee Name'
          ref={merchant}
          className='bg-black p-2 rounded outline-none border-black border-2 focus:border-white transition duration-300 ease-in-out'
        />
        <select
          name='paymentType'
          id='paymentType'
          ref={paymentType}
          className='bg-black p-2 rounded outline-none border-black border-2 focus:border-white transition duration-300 ease-in-out'
          onChange={() => {
            switch (paymentType.current?.value) {
              case 'upi':
                setInput(
                  <input
                    type='text'
                    placeholder='UPI ID'
                    ref={upi}
                    className='bg-black p-2 rounded outline-none border-black border-2 focus:border-white transition duration-300 ease-in-out'
                  />
                );
                break;
              case 'account':
                setInput(
                  <>
                    <input
                      type='text'
                      placeholder='Bank Account Number'
                      ref={account}
                      className='bg-black p-2 rounded outline-none border-black border-2 focus:border-white transition duration-300 ease-in-out'
                    />
                    <input
                      type='text'
                      placeholder='IFSC Code'
                      ref={ifsc}
                      className='bg-black p-2 rounded outline-none border-black border-2 focus:border-white transition duration-300 ease-in-out'
                    />
                  </>
                );
                break;
              case 'aadhaar':
                setInput(
                  <input
                    type='text'
                    placeholder='Aadhaar Number'
                    ref={aadhaar}
                    className='bg-black p-2 rounded outline-none border-black border-2 focus:border-white transition duration-300 ease-in-out'
                  />
                );
                break;
              case 'mobile':
                setInput(
                  <input
                    type='text'
                    placeholder='Mobile Number'
                    ref={mobile}
                    className='bg-black p-2 rounded outline-none border-black border-2 focus:border-white transition duration-300 ease-in-out'
                  />
                );
                break;
              default:
              case 'upi':
                setInput(
                  <input
                    type='text'
                    placeholder='UPI ID'
                    ref={upi}
                    className='bg-black p-2 rounded outline-none border-black border-2 focus:border-white transition duration-300 ease-in-out'
                  />
                );
                break;
            }
          }}
        >
          <option value='upi'>UPI Address</option>
          <option value='account'>Bank Account Number</option>
          <option value='aadhaar'>Aadhaar Number</option>
          <option value='mobile'>Mobile Number</option>
        </select>
        {/* {input} */}
        {input ? (
          input
        ) : (
          <input
            type='text'
            placeholder='UPI ID'
            ref={upi}
            className='bg-black p-2 rounded outline-none border-black border-2 focus:border-white transition duration-300 ease-in-out'
          />
        )}

        <input
          type='text'
          placeholder='Transaction Amount'
          ref={amount}
          className='bg-black p-2 rounded outline-none border-black border-2 focus:border-white transition duration-300 ease-in-out'
        />
        <select
          name='currency'
          id='currency'
          ref={currency}
          className='bg-black p-2 rounded outline-none border-black border-2 focus:border-white transition duration-300 ease-in-out'
        >
          <option value='INR'>INR</option>
          <option value='USD'>USD</option>
          <option value='EUR'>EUR</option>
          <option value='GBP'>GBP</option>
          <option value='JPY'>JPY</option>
          <option value='AUD'>AUD</option>
          <option value='CAD'>CAD</option>
          <option value='CHF'>CHF</option>
          <option value='CNY'>CNY</option>
          <option value='SEK'>SEK</option>
          <option value='NZD'>NZD</option>
          <option value='MXN'>MXN</option>
          <option value='SGD'>SGD</option>
          <option value='HKD'>HKD</option>
          <option value='NOK'>NOK</option>
        </select>
        <input
          type='text'
          placeholder='Description (Notes)
'
          ref={description}
          className='bg-black p-2 rounded outline-none border-black border-2 focus:border-white transition duration-300 ease-in-out'
        />
        <button
          type='submit'
          className='bg-white text-black p-2 rounded hover:bg-black hover:text-white border-white border-2 transition duration-300 ease-in-out'
        >
          Generate QR Code
        </button>
      </form>
      <Image
        src={image ? image : defaultImage}
        // src={image}
        alt='QR code'
        width={400}
        height={400}
        className='object-contain invert'
      />
    </div>
  );
};

export default Form;
