import classNames from "classnames";
import { IPhone } from "../../models/phone";

import './PhoneCard.scss';

interface IPhoneCardProps {
  phone: IPhone;
}

const PhoneCard: React.FC<IPhoneCardProps> = ({ phone }) => {

  const buttonText = !phone.isPreorder ? 'Купить' : 'Оформить предзаказ';

  const reviewText = (phone.feedbackCount > 1 && phone.feedbackCount < 5) ? ' отзыва' : ' отзывов';

  const preorderStartDate = phone.isPreorder
    ? (
        <div className="phone-card__preorder-info">
          Страт продаж { phone.preorderStartDate }
        </div>
      )
    : null;

  const quickoOrder = !phone.isPreorder ? <span className="btn--outline">Быстрый заказ</span> : null;

  const freeShipping = phone.hasFreeDelivery
    ? (
        <span className="phone-card__delivery__btn phone-card__delivery__btn--primary">
          <span className="icon icon--delivery"></span>
          Бесплатная доставка
        </span>
      )
    : null;

  const promo = phone.promo
    ? (
        <div className="phone-card__promo">
          <span className="icon icon--gift"></span>
          { phone.promo }
        </div>
      )
    : null;

  return (
    <div className="phone-card">
      {/* <h4 className="phone-card__title">{ phone.name }</h4> */}
      <div className="phone-card__label">
        <span className={
          classNames(
            "badge",
            {'badge--new': phone.isLatest},
            {'badge--preorder': phone.isPreorder}
          )
        }>
          <span className="badge__text">{ phone.isLatest ? 'Новинка' : 'Предзаказ' }</span>
          <svg className="badge__tail" viewBox="0 0 14 14"><path d="M14 0s-3.7 6.3-6 8c-4 3-8 3-8 3s4 3 8 3c3 0 6-1 6-1V0z" fill="currentColor"></path></svg>
        </span>
      </div>

      <div className="phone-card__thumbnail">
        <img src={phone.thumbImageUrlConverted} alt={phone.name} title={phone.name} />
      </div>

      <div className="phone-card__info">
        <h4 className="phone-card__title">{ phone.name }</h4>

        <div className="phone-card__rating rating">
          <div className="rating__container">
            <span className={classNames("icon icon--star", {'active': phone.rate > 0})}></span>
            <span className={classNames("icon icon--star", {'active': phone.rate > 1})}></span>
            <span className={classNames("icon icon--star", {'active': phone.rate > 2})}></span>
            <span className={classNames("icon icon--star", {'active': phone.rate > 3})}></span>
            <span className={classNames("icon icon--star", {'active': phone.rate > 4})}></span>
          </div>

          <span className="rating__feedback">
            {
              phone.feedbackCount + (phone.feedbackCount === 1
                ? ' отзыв'
                : reviewText
              )
            }
          </span>
        </div>

        <div className="phone-card__info__buttons">
          <span className="btn">
            <span className="icon icon--compare"></span>
            <span className="btn__text">
              Добавить в сравнение
            </span>
          </span>
        </div>

        <div className="phone-card__attributes">
          {
            phone.parameters.map(attribute => {
              return (
                <div key={attribute.name} className="phone-card__attributes__item">
                  <span className="phone-card__attributes__item__name">{ attribute.name }</span>
                  <span className="phone-card__attributes__item__value">{ attribute.value }</span>
                </div>
              )
            })
          }
        </div>
      </div>

      <div className="phone-card__actions">
        <div className="phone-card__price">
          <span className="phone-card__old-price"></span>
          { phone.newPrice }
        </div>

        {
          !phone.isOutOfStock
            ? (
                <div> { preorderStartDate }

                  <div className="phone-card__actions__buttons">
                    <button type="button" className="btn">
                      <span>{ buttonText }</span>
                    </button>
                    { quickoOrder }
                  </div>

                  <div className="phone-card__delivery">
                    <span className="phone-card__delivery__btn">
                      <span className="icon icon--location"></span>
                      Самовывоз
                    </span>
                    {freeShipping}
                  </div>

                  { promo }

                </div>
              )
            : (
                <div>
                  <span>Нет в наличии</span>
                </div>
            )
        }
      </div>
    </div>
  );
}

export default PhoneCard;
