import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';


class ContactData extends Component {
    state = {
        // coulve done differently with helper methods yet this is a form wich displays whats going on exacly
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validations: {
                    required: true
                },
                valid: false,
                touched: false
            },
            address:  {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Address'
                },
                value: '',
                validations: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street:  {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street Name'
                },
                value: '',
                validations: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode:  {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP code'
                },
                value: '',
                validations: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country:  {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validations: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email:  {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Personal email'
                },
                value: '',
                validations: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod:  {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: ''
            }
        },

        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);
        // alert('You continue!');
        // console.log('[BurgerBuilder.js] continuePurchaseAction');
        this.setState({loading: true});
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        // Hard coding da informaçao dum cliente para razoes de teste
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }    
        axios.post('/orders.json', order)
            .then(response=> {
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false});
            });
    }
    
    // metodo para returnar false ou true dpendente do valor da string ser diferente de 0
    // .trim tira os espaços
    checkValidity(value, rules) {
        let isValid = true;
        
        // if (rules.required) {
        //     isValid = value.trim() !== '' && isValid;
        // }

        // if (rules.minLength) {
        //     isValid = value.length >= rules.minLength && isValid; 
        // }

        // if (rules.maxLength) {
        //     isValid = value.length <= rules.maxLength && isValid;
        // }
        return isValid;
    }
    
    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedOrderForm.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validations);
        updatedFormElement.touched = true;
        //testar o metodo de validaçao em cada keystroke
        console.log(updatedFormElement.valid)
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({orderForm: updatedOrderForm});
    }


    render () {
        const formElementsArray = [];
        for(let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
        <form onSubmit={this.orderHandler}>
            {formElementsArray.map(formElement => (
                <Input 
                    key={formElement.id}
                    elementType={formElement.config.elementType} 
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
            ))}
            <Button btnType="Success" >Order</Button>
        </form>)
        if (this.state.loading) {
            form = <Spinner/>;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter you Contact Data</h4>
                {form}
            </div>
        );
    }
}


export default ContactData;