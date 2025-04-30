import { Progress, Card, Tooltip } from "antd";
import {
  FaGift,
  FaCheckCircle,
  FaListOl,
  FaMoneyBillWave,
} from "react-icons/fa";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

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
  const { width, height } = useWindowSize();
  const targetCount = freeCounter - 1;
  const targetAmount = freeCounterAmount;

  const countPercent = Math.min((completedCountBonus / targetCount) * 100, 100);
  const amountPercent = Math.min(
    (completedAmountBonus / targetAmount) * 100,
    100
  );

  const isEligible =
    completedCountBonus >= targetCount && completedAmountBonus >= targetAmount;

  return (
    <Card
      size="small"
      className="border border-green-200 bg-green-50"
      title={
        <div className="flex items-center gap-2 text-green-700 font-semibold">
          <FaGift />
          <span>Bonus yuvishga qoldi</span>
        </div>
      }
    >
      {isEligible ? (
        <div className="relative">
          <Confetti width={width} height={height} numberOfPieces={200} />
          <div className="flex items-center gap-2 text-green-700 font-medium z-10 relative">
            <FaCheckCircle className="text-lg" />
            <span>Sizda hozir tekin yuvish mavjud!</span>
          </div>
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
                strokeColor="#22c55e"
                format={() => `${completedCountBonus}/${targetCount} ta yuvish`}
              />
            </Tooltip>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1 text-text-muted">
              <FaMoneyBillWave />
              <span>To'langan summa</span>
            </div>
            <Tooltip
              title={
                targetAmount - completedAmountBonus <= 0
                  ? "Tabriklaymiz! To'lov qiymati to'ldi 🎉"
                  : `Yana ${
                      targetAmount - completedAmountBonus
                    } ta yuvish kerak`
              }
            >
              <Progress
                percent={amountPercent}
                status="active"
                strokeColor="#22c55e"
                format={() =>
                  `${completedAmountBonus.toLocaleString()}/${targetAmount.toLocaleString()} so‘m`
                }
              />
            </Tooltip>
          </div>
        </div>
      )}
    </Card>
  );
};
