import React, { Component } from 'react';
import './App.css';
// eslint-disable-next-line
import data from './base.json'

function Answer(props) {
  if (props.answer == null) {
    return (
      <div className="question-area">
        Ничего не найдено!
      </div>
    )
  }
  return (
    <div className="question-area">
      Вероятнее всего у Вас {data.rules_answers[props.answer]}! Обратитесь в сервис!
    </div>
  )
}

// eslint-disable-next-line
let currentQuest = ""
let currentRule = ""
let ignoreYes = []
let ignoreNo = []
let rules_queue_index = 0
let rule_index = 0
let getAnswer = false

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {

    }

    this.no = this.No.bind(this)
    this.yes = this.Yes.bind(this)
    this.answer = this.Answer.bind(this)
    this.reload = this.Reload.bind(this)
    this.reset = this.Reset.bind(this)
  }

  Reset () {
    currentQuest = ""
    currentRule = ""
    ignoreYes = []
    ignoreNo = []
    rules_queue_index = 0
    rule_index = 0
    getAnswer = false
    this.setState({})
  }

  Reload () {
    this.setState({})
  }

  Answer () {
    getAnswer = true
    this.setState({})
  }

  No () {
    ignoreNo.push(currentQuest)
    rules_queue_index++
    rule_index = 0
    this.setState({})
  }

  Yes () {
    ignoreYes.push(currentQuest)
    rule_index++
    this.setState({})
  }

  render () {
    return (
      <div className="body">
          <div className="frame">
              <div className="screen">
                {
                  getAnswer ? <Answer answer={currentRule}/> :
                  <>
                    <div className="question-area">
                      {
                        // eslint-disable-next-line
                        data.rules_queue.map((rule, queue, queue_list) => {
                          if (queue_list.length > rules_queue_index) {
                            if (queue === rules_queue_index){
                              currentRule = rule
                              // eslint-disable-next-line
                              return data.rules[rule].map((item, rule_queue, rules) => {
                                if (!ignoreNo.includes(item)) {
                                  if (rules.length -1 >= rule_index) {
                                    if (rule_queue === rule_index) {
                                      if (!ignoreYes.includes(item)) {
                                        currentQuest = item
      
      
                                        return (
                                          <React.Fragment key={rule_index}>
                                            {data.questions[item]}
                                          </React.Fragment>
                                        )
                                      } else {
                                        console.log(1)
                                        rule_index++
                                        this.reload.bind(this)
                                      }
                                    } else {
                                      console.log(2)
                                      this.reload.bind(this)
                                    }
                                  } else {
                                    console.log(3)
                                    this.answer()
                                  }
                                } else {
                                  console.log(4)
                                  rule_index++
                                  this.reload.bind(this)
                                }
                              })
                            }
                          } else {
                            console.log(5)
                            currentRule = null
                            this.answer()
                          }
                        })
                      }
                    </div>
                    <div className="button-area">
                      {!getAnswer && 
                      <>
                      <button id="no" onClick={this.no}>Нет</button>
                      <button id="yes" onClick={this.yes}>Да</button>
                      </>
                      }
                    </div>
                  </>
                }
              </div>
              <button id="home" onClick={this.reset}></button>
          </div>
      </div>
    );
  }
}

export default App;
