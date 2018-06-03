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
            questionIndex:0
        };
      this.handleRadioChange = this.handleRadioChange.bind(this);
    }

    handleRadioChange(e) {
        let input = e.target.value;
        this.setState({
            questionId: input
        });
       console.log('questionId', this.state.questionId);
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

    render() {
        const { questions, options, questionIndex } = this.state;
        //console.log('this.state.questions', questions);
        const questionEls = questions.map((q) =>{
        return(
         <div>
             <FormGroup>
         <h1 className='h2FormQuestions'>{q.question_text}</h1>
         <Radio value='option1' onChange={this.handleRadioChange}>{q.answer_option1}</Radio>
         <Radio value='option2' onChange={this.handleRadioChange}>{q.answer_option2}</Radio>
         <Radio value='option3' onChange={this.handleRadioChange}>{q.answer_option3}</Radio>
         <Radio>{q.answer_option4}</Radio>
         <Radio>{q.answer_option5}</Radio>

         </FormGroup>
         </div>
     )

 })

        return (
            <div className='flex-container'>
                <Jumbotron bsClass='formCustom'>
               
                {questionEls[questionIndex]}
                 <button onClick={() => {this.setState({questionIndex: questionIndex + 1})}}> Next </button>
                </Jumbotron>
            </div>
        );

    }
}

export default QuestionsForm;