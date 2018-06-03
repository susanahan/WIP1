import React, {Component} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import { Button, Jumbotron, FormGroup, Radio} from 'react-bootstrap';
import '../styles/questionsForm.css';

class QuestionsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            questionId: '',
            user_id: '',
            questionIndex:0,
            selectedOption: ''
        };
    }

    handleRadioChange = (e) => {
        let input = e.target.value;
        this.setState({
            selectedOption: input
        });
    };

    componentDidMount() {
        axios
            .get('/users/questions')
            .then((res) => {
                console.log('res' , res.data.data)
                this.setState({questions: res.data.data})
            })
            .catch((err) => {
                console.log(err);
            })
    }
    nextQuestion = () =>{
        if(questionIndex === 0){
            this.setState({
                questionIndex: null               
            })
        }else{
            this.setState({
                questionIndex: questionIndex + 1               
            })
        }    
    }
    
    render() {
        const { questions, options, questionIndex, selectedOption } = this.state;
        //console.log('this.state.questions', questions);
        const questionEls = questions.map((q) =>{
        return(
         <div>
         <FormGroup>
            <h1 className='h2FormQuestions'>{q.question_text}</h1>
            <Radio value='option1'  checked={selectedOption === 'option1'} onChange={this.handleRadioChange}>{q.answer_option1}</Radio>
            <Radio value='option2'  checked={selectedOption === 'option2'} onChange={this.handleRadioChange}>{q.answer_option2}</Radio>
            <Radio value='option3'  checked={selectedOption === 'option3'} onChange={this.handleRadioChange}>{q.answer_option3}</Radio>
            <Radio value='option4'  checked={selectedOption === 'option4'} onChange={this.handleRadioChange}>{q.answer_option4}</Radio>
            <Radio value='option5'  checked={selectedOption === 'option5'} onChange={this.handleRadioChange}>{q.answer_option5}</Radio>
         </FormGroup>
         </div>
        )
    })
        return (
            <div className='flex-container'>
                <Jumbotron bsClass='formCustom'>
                {questionEls[questionIndex]}
                 <button onClick={this.nextQuestion}> Next </button>
                </Jumbotron>
            </div>
        );
    }
}

export default QuestionsForm;