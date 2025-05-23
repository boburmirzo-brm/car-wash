import { Progress, Card, Tooltip } from "antd";
import {
  FaGift,
  FaListOl,
  FaMoneyBillWave,
} from "react-icons/fa";
import Confetti from "react-confetti";
import "./style.css";
import { useEffect, useState } from "react";

interface Props {
  completedCountBonus: number;
  completedAmountBonus: number;
  freeCounter: number;
  freeCounterAmount: number;
}

export const BonusProgress = ({
  completedCountBonus,
  completedAmountBonus,
  freeCounter,
  freeCounterAmount,
}: Props) => {
  const targetCount = freeCounter - 1;
  const targetAmount = freeCounterAmount;
  const [timeline, setTimeline] = useState(false);

  const countPercent = Math.min((completedCountBonus / targetCount) * 100, 100);
  const amountPercent = Math.min(
    (completedAmountBonus / targetAmount) * 100,
    100
  );

  const isEligible =
    completedCountBonus >= targetCount && completedAmountBonus >= targetAmount;
  useEffect(() => {
    if (isEligible) {
      setTimeline(true);
      setTimeout(() => {
        setTimeline(false);
      }, 7000);
    }
  }, [isEligible]);

  return (
    <Card
      size="small"
      className="border border-green-200 bg-green-50"
      title={
        <div className={`${isEligible ? "text-xl" : ""} flex items-center gap-2 text-green-700 font-semibold`}>
          <FaGift />
          <span>{isEligible ? "Bugun bonus yuvish kuni yani BEPUL 🎉🎉🎉" : "Bonus yuvishga qoldi"}</span>
        </div>
      }
    >
      {isEligible ? (
        <div className="fixed top-0 left-0 w-full">
          {timeline && <Confetti className="w-full" numberOfPieces={200} />}
        </div>
      ) : (
        <div className="space-y-3">
          <div>
            <div className="flex items-center gap-2 mb-1 text-text-muted">
              <FaListOl />
              <span>Yuvishlar soni</span>
            </div>
            <Tooltip
              title={
                targetCount - completedCountBonus <= 0
                  ? "Tabriklaymiz! Yuvishlar soni to'ldi 🎉"
                  : `Yana ${targetCount - completedCountBonus} ta yuvish kerak`
              }
            >
              <Progress
                percent={countPercent}
                status="active"
                className="bonus-progress"
                strokeColor="#22c55e"
                format={() => `${completedCountBonus}/${targetCount} ta yuvish`}
              />
            </Tooltip>
          </div>

          {targetAmount !== 0 ? (
            <div>
              <div className="flex items-center gap-2 mb-1 text-text-muted">
                <FaMoneyBillWave />
                <span>To'langan summa</span>
              </div>
              <Tooltip
                title={
                  targetAmount - completedAmountBonus <= 0
                    ? "Tabriklaymiz! To'lov qiymati to'ldi 🎉"
                    : `Yana ${(
                        targetAmount - completedAmountBonus
                      ).toLocaleString()} so'mlik yuvish kerak`
                }
              >
                <Progress
                  percent={amountPercent}
                  status="active"
                  strokeColor="#22c55e"
                  className="bonus-progress"
                  format={() =>
                    `${completedAmountBonus.toLocaleString()}/${targetAmount.toLocaleString()} so‘m`
                  }
                />
              </Tooltip>
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    </Card>
  );
};
