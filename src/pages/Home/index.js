import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Container,
  Header,
  ListHeader,
  Card,
  InputSearchContainer,
} from './styles';
import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  useEffect(() => {
    fetch(`http://localhost:3001/contacts?orderBy=${orderBy}`).then(async (response) => {
      const json = await response.json();
      setContacts(json);
    }).catch((error) => {
      console.error(error);
    });
  }, [orderBy]);
  function handleToggleOrderBy() {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }
  return (
    <Container>
      <InputSearchContainer>
        <input type="text" placeholder="Pesquisar contato..." />
      </InputSearchContainer>
      <Header>
        <strong>
          {contacts.length}
          {contacts.length === 1 ? ' contato' : ' contatos'}
        </strong>
        <Link to="/new">Novo contato</Link>
      </Header>
      <ListHeader orderBy={orderBy}>
        <button type="button" onClick={handleToggleOrderBy}>
          <span>Nome</span>
          <img src={arrow} alt="arrow icon" />
        </button>
      </ListHeader>
      {contacts.map((contact) => (
        <Card key={contact.id}>
          <div className="info">
            <div className="contact-name">
              <strong>{contact.name}</strong>
              {contact.category_name && <small>{contact.category_name}</small>}
            </div>
            <span>{contact.email}</span>
            <span>{contact.phone}</span>
          </div>
          <div className="actions">
            <Link to={`/edit/${contact.id}`}>
              <img src={edit} alt="edit icon" />
            </Link>
            <button type="button">
              <img src={trash} alt="delete icon" />
            </button>
          </div>
        </Card>
      ))}
    </Container>
  );
}

// SOP -> Same Origin Policy -> Política de mesma origem (chama-se esse tipo de requisição de 'basic')
// Origem -> protocolo://domínio:porta
// Para obedecer essa política, a saída e o destino das requisições devem ser iguais, por exemplo:
// Saída: http://localhost:3000
// Destino: http://localhost:3000

// CORS -> Cross-Origin Resource Sharing -> compartilhamento de recursos entre origens diferentes/cruzadas
// Preflight -> quando a requisição não é do tipo GET, POST e HEAD, esse tipo de requisição é acionada pelo navegador antes da requisição feita pelo usuário.

// Requisição do tipo OPTIONS com o mesmo endereço que será feita a requisição do usuário.
// Isso acontece para que o navegador se comunique com o backend para saber se a origem (endpoint) está permitido, assim como o método HTTP e os headers.
