import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';
import { Section } from './Section/Section';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  formSubmitHandler = data => {
    const isContactExists = this.state.contacts.some(
      contact => contact.name.toLowerCase() === data.name.toLowerCase()
    );
    isContactExists
      ? alert(`${data.name} is already in contacts`)
      : this.setState(({ contacts }) => ({
          contacts: [...contacts, { ...data, id: nanoid() }],
        }));
  };

  filterForm = evt => {
    this.setState({ filter: evt.currentTarget.value });
  };

  onFilterForm = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteItem = itemId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== itemId),
    }));
  };

  componentDidMount() {

    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({contacts : parsedContacts}) 
    }
  }

  componentDidUpdate(prevProps, prevState) {

    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const onFilterName = this.onFilterForm();

    return (
      <>
        <Section>
          <h1>Phonebook</h1>
          <ContactForm onSubmit={this.formSubmitHandler} />
        </Section>
        <Section>
          <h2>Contacts</h2>
          <Filter value={this.state.filter} filter={this.filterForm} />
          <ContactsList
            onFilterName={onFilterName}
            deleteItem={this.deleteItem}
          />
        </Section>
      </>
    );
  }
}
