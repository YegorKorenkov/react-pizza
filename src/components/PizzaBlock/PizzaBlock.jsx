import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Button from '../Button';


function PizzaBlock({ id, name, imageUrl, price, types, sizes, onClickAddPizza, addedCount }) {
    const avaibleTypes = ['тонкое', 'толстое'];
    const avaibleSizes = [26, 30, 40];
    const [activeType, setActiveType] = React.useState(types[0]);
    const [activeSize, setActiveSize] = React.useState(avaibleSizes.map(item => sizes.indexOf(item)).indexOf(0));
    
    const onSelectType = id => {
        setActiveType(id)
    }

    const onSelectSize = id => {
        setActiveSize(id)
    }

    const onAddPizza = () => {
        const obj = {
            id,
            name,
            imageUrl,
            price,
            size: avaibleSizes[activeSize],
            type: avaibleTypes[activeType]
        }
        onClickAddPizza(obj);
    }
    
    return (
        <div className="pizza-block">
              <img
                className="pizza-block__image"
                src={imageUrl}
                alt="Pizza"
              />
              <h4 className="pizza-block__title">{name}</h4>
              <div className="pizza-block__selector">
                <ul>
                 {avaibleTypes.map((type, id) => (
                    <li
                        onClick={() => onSelectType(id)} 
                        className={classNames({
                            active: activeType === id,
                            disabled: !types.includes(id)
                        })} 
                        key={type + id}>
                        {type}
                    </li>
                 ))}
                </ul>
                <ul>
                  {avaibleSizes.map((size, id) => (
                    <li
                        key={size+id}
                        onClick={() => onSelectSize(id)}
                        className={classNames({
                            active: activeSize === id,
                            disabled: !sizes.includes(size)
                        })}>
                        {size} см.
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pizza-block__bottom">
                <div className="pizza-block__price">от {price} ₽</div>
                <Button className="button--add" outline onClick={onAddPizza}>
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                        d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                        fill="white"
                        />
                    </svg>
                    <span>Добавить</span>
                    {addedCount && <i>{addedCount}</i>}
                </Button>
            </div>
        </div>
    );
}

PizzaBlock.propTypes = {
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    price: PropTypes.number.isRequired,
    types: PropTypes.arrayOf(PropTypes.number),
    sizes: PropTypes.arrayOf(PropTypes.number),
    onAddPizza: PropTypes.func,
    addedCount: PropTypes.number
}

PizzaBlock.defaultProps = {
    name: '---',
    price: 0,
    types: [],
    sizes: [],
};

export default PizzaBlock;