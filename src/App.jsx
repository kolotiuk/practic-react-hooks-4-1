import { useState, useEffect } from 'react';

import Modal from 'components/Modal/Modal';

const POKEMONS = 'pokemons';

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    const myMethod = () => {
      fetch('https://pokeapi.co/api/v2/pokemon/')
        .then((res) => res.json())
        .then((res) => {
          console.log('res>>>>>>>>>>>>>>>>>>>>>>>', res);
          setPokemons((prev) => [...prev, ...res.results]);
        })
        .finally(() => {
          setTimeout(() => {
            window.scrollTo({
              top: 1000,
              behavior: 'smooth',
            });
          }, 400);
        });
    };

    const parsedPokemons = JSON.parse(
      localStorage.getItem(POKEMONS)
    );
    parsedPokemons
      ? setPokemons(parsedPokemons)
      : myMethod();
  }, []);

  useEffect(() => {
    const snapshot = pokemons.length - 2;
    if (snapshot === 20) {
      localStorage.setItem(
        POKEMONS,
        JSON.stringify(pokemons)
      );
    }
  }, [pokemons]);

  const closeModal = () => {
    console.log('close');
    setName('');
  };

  return (
    <>
      {name ? (
        <Modal name={name} closeModal={closeModal} />
      ) : (
        <>
          {/* <button type='button' onClick={myMethod}>
            Load pictures
          </button> */}
          <ul>
            {pokemons
              ? pokemons.map((el) => (
                  <li
                    key={el.name}
                    onClick={() => setName(el.name)}>
                    <p>{el.name}</p>
                    {/* <img
                        src={webformatURL}
                        alt='alt'
                        width='300'
                      /> */}
                  </li>
                ))
              : null}
            {/* {state.value.map(({ webformatURL, id }) => (
                <li key={id}>
                  <img
                    src={webformatURL}
                    alt='alt'
                    width='300'
                  />
                </li>
              ))} */}
          </ul>
        </>
      )}
    </>
  );
};

export default App;
