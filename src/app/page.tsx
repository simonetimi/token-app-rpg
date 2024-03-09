'use client';

import { useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { HandRaisedIcon } from '@heroicons/react/24/outline';
import { MinusCircleIcon } from '@heroicons/react/24/outline';
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Radio,
  RadioGroup,
} from '@nextui-org/react';

import BadToken from './component/BadToken';
import GoodToken from './component/GoodToken';

export default function Home() {
  const goodTokens = 15;
  const [drawAmount, setDrawAmount] = useState(1);
  const [badTokens, setBadTokens] = useState(1);
  const [isTarotDrew, setIsTarotDrew] = useState(false);
  const [showInputs, setShowInputs] = useState(false);
  const [confirmReset, setConfirmReset] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(true);

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
    if (drawAmount === 1) {
      toast('Yes! You drew a good token!', { icon: '👌', duration: 3000 });
    } else {
      toast(`Yes! You drew ${drawAmount} good tokens!`, {
        icon: '👌',
        duration: 3000,
      });
    }
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

  const handleOnReset = () => {
    toast.dismiss();
    if (confirmReset) {
      setConfirmReset(!confirmReset);
      return;
    } else {
      setConfirmReset(!confirmReset);
      setDrawAmount(1);
      setBadTokens(1);
      setIsTarotDrew(false);
      toast.success('Your session has been reset!');
    }
  };

  const handleOnDelete = () => {
    toast.dismiss();
    if (confirmDelete) {
      setConfirmDelete(!confirmDelete);
      return;
    } else {
      setConfirmDelete(!confirmDelete);
      localStorage.clear();
      toast.success('Data has been deleted from local storage!');
    }
  };

  const handleOnSaveSession = () => {
    toast.dismiss();
    const session = {
      drawAmount,
      badTokens,
      isTarotDrew,
    };
    localStorage.setItem('session', JSON.stringify(session));
    toast.success('Session saved locally!');
  };

  useEffect(() => {
    toast.dismiss();
    const storedSession = localStorage.getItem('session');
    if (storedSession !== null) {
      const session = JSON.parse(storedSession);
      setDrawAmount(session.drawAmount);
      setBadTokens(session.badTokens);
      setIsTarotDrew(session.isTarotDrew);
      toast.success('Session retrieved from local storage!');
    }
  }, []);

  return (
    <main className="flex flex-col items-center justify-start gap-2 ">
      <Toaster
        toastOptions={{
          style: {
            maxWidth: 500,
          },
        }}
      />
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
        </div>
        <RadioGroup
          className="mb-4"
          orientation="horizontal"
          value={drawAmount.toString()}
          onChange={handleOnChangeDrawAmount}
        >
          <Radio value="1">1</Radio>
          <Radio value="2">2</Radio>
          <Radio value="3">3</Radio>
        </RadioGroup>
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
          className="w-26 mt-6 h-9"
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
        <div className="flex gap-2">
          <Button
            onClick={handleOnSaveSession}
            color="primary"
            className="w-26 mt-12 h-9"
          >
            Save session
          </Button>
          <Popover placement="top" color="warning">
            <PopoverTrigger>
              <Button
                onClick={handleOnReset}
                color="warning"
                className="w-26 mt-12 h-9"
              >
                {confirmReset ? 'Reset' : 'Confirm Reset'}
              </Button>
            </PopoverTrigger>
            <PopoverContent>Are you sure you want to reset?</PopoverContent>
          </Popover>
          <Popover placement="top" color="danger">
            <PopoverTrigger>
              <Button
                onClick={handleOnDelete}
                color="danger"
                className="w-26 mt-12 h-9"
              >
                {confirmDelete ? 'Delete' : 'Confirm Delete'}
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              Are you sure you want to delete data?
            </PopoverContent>
          </Popover>
        </div>
      </section>
    </main>
  );
}
