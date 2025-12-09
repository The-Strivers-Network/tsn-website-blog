import React from 'react';
import { formatChange } from '@/lib/analytics-types';

interface CardProps {
  title: string;
  value: string | number;
  change?: number | null;
  formatter?: (value: number) => string;
  positiveIsGood?: boolean;
}

export const Card = (props: CardProps) => {
  const { title, value, change, positiveIsGood = true, formatter } = props;
  const formattedValue = formatter ? formatter(Number(value)) : value;
  const changeData = formatChange(change || null);
  const isPositive = positiveIsGood ? changeData.isPositive : !changeData.isPositive;

  return (
    <li>
      <div className="card" style={{ flexDirection: 'column' }}>
        <h3 className="card__title">{title}</h3>
        <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{formattedValue}</div>
        {change !== undefined && (
          <div
            style={{
              color: isPositive ? '#10b981' : '#ef4444',
              fontSize: '0.875rem',
              marginTop: '0.5rem',
            }}
          >
            {changeData.text} from previous period
          </div>
        )}
      </div>
    </li>
  );
};

export default Card;
