'use client';

import { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { HandRaisedIcon } from '@heroicons/react/24/outline';
import { MinusCircleIcon } from '@heroicons/react/24/outline';
import { Button, Input } from '@nextui-org/react';

import BadToken from './component/BadToken';
import GoodToken from './component/GoodToken';

export default function Home() {
  const goodTokens = 15;
  const [drawAmount, setDrawAmount] = useState(1);
  const [badTokens, setBadTokens] = useState(1);
  const [showInputs, setShowInputs] = useState(false);
  const [isTarotDrew, setIsTarotDrew] = useState(false);

  const handleOnClickDraw = () => {
    toast.dismiss();
    const totalTokens = badTokens + goodTokens;
    const badTokenProbability = badTokens / totalTokens;

    for (let i = 0; i < drawAmount; i += 1) {
      const randomNumber = Math.random();
      if (randomNumber < badTokenProbability) {
        toast('Oh no! You drew a bad token!', { icon: '😵', duration: 3000 });
        // reset state
        return setBadTokens(1);
      }
    }

    if (badTokens === 5 && !isTarotDrew) {
      setIsTarotDrew(true);
      toast('Pick the Wheel of Fortune!', {
        icon: '🃏',
        duration: 3000,
      });
      return setBadTokens(badTokens + 1);
    }

    // show success and add bad token if it's 5 or less
    toast('Yes! You drew a good token!', { icon: '👌', duration: 3000 });
    if (badTokens < 6) {
      setBadTokens(badTokens + 1);
    }
  };

  const onShowCustom = () => {
    setShowInputs(!showInputs);
  };

  const handleOnChangeDrawAmount = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDrawAmount(Number(event.target.value));
  };

  const handleOnChangeTokens = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBadTokens(Number(event.target.value));
  };

  const handleOnClickRemoveToken = () => {
    toast.dismiss();
    if (badTokens > 0) {
      const updatedTokens = badTokens - 1;
      setBadTokens(updatedTokens);
    } else {
      toast.error('Your token bag is already free of bad tokens.', {
        duration: 3000,
      });
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-2">
      <Toaster
        toastOptions={{
          style: {
            maxWidth: 500,
          },
        }}
      />
      <h1 className="font-grandstander mb-20 mt-12 text-4xl text-purple-600">
        Token Bag
      </h1>
      <section className="flex gap-2">
        <div className="flex flex-col items-center justify-center gap-2">
          <GoodToken /> <BadToken />
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <p>{goodTokens}</p>
          <p>{badTokens}</p>
        </div>
      </section>
      <section className="mt-10 flex flex-col items-center gap-4">
        <div className="flex gap-2">
          <Button
            color="primary"
            className="h-9 animate-bounce hover:animate-none"
            onClick={handleOnClickDraw}
          >
            <HandRaisedIcon className="w-1/3" /> Draw!
          </Button>
          <Input
            type="number"
            className="w-10"
            variant="underlined"
            min="1"
            max="3"
            onChange={handleOnChangeDrawAmount}
            value={drawAmount.toString()}
          />
        </div>
        <Button
          color="secondary"
          className="h-9 text-white"
          onClick={handleOnClickRemoveToken}
        >
          <MinusCircleIcon className="h-6" /> Remove Bad Token
        </Button>
        <Button
          onClick={onShowCustom}
          color="default"
          className="w-26 mt-12 h-9"
        >
          Insert custom values
        </Button>
        {showInputs ? (
          <div className="mt-4 flex flex-col items-center justify-center gap-4">
            <Input
              type="number"
              color="secondary"
              label="Bad Tokens"
              value={badTokens.toString()}
              onChange={handleOnChangeTokens}
              className="w-32"
              max="6"
              min="0"
            />
          </div>
        ) : null}
      </section>
    </main>
  );
}
