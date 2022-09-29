import { useState, useEffect } from 'react';

const Modal = ({ name, closeModal }) => {
  const [onePokemon, setOnePokemon] = useState(null);

  useEffect(() => {
    const findPokemon = () => {
      fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((res) => res.json())
        .then((res) => {
          setOnePokemon(res.sprites.front_default);
        });
    };
    findPokemon();

    document.addEventListener('keydown', closeModal);

    return () => {
      document.removeEventListener('keydown', closeModal);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <img src={onePokemon} alt='alt' width='300' />;
};

export default Modal;
