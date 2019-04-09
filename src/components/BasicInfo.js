import React from 'react';
import { Form, Input, Select, DatePicker, Button, Tooltip } from 'antd';
import moment from 'moment';


const { Option } = Select;

class BasicInfo extends React.Component {
  constructor(props) {
    super(props);
    this.setUserInfo = props.setUserInfo;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.focusNext = this.focusNext.bind(this);
    this.fields = Array(3).fill().map( () => React.createRef() );
  }

  focusNext(index) {
    return (e) => {
      switch (index) {
        case 0:
        case 1:
          this.fields[index].current.focus();
          break;
        case 2:
          if (e === true) break;
          setTimeout( () => this.fields[index].current.focus(), 0);
          break;
        case 3:
          this.fields[2].current.blur();
          break;
        default:
          break;
      }
    }
  }

  handleSubmit() {
    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }
        
      const lifespan = values.lifespan > 150 ? 150: values.lifespan;

      this.setUserInfo({
        name: values.name.trim(),
        gender: values.gender,
        birthday: values.birthday,
        lifespan: parseInt(lifespan),
        startOfWeek: moment(values.birthday).startOf('week'),
        duration: parseInt(lifespan) * 52
      });      
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
        <Form className='BasicInfo' layout='inline' style={basicInfoStyle}>
          <div className='row-wrapper' style={rowWrapperStyle}>
            <Form.Item>
              {getFieldDecorator('name', {
                rules: [{
                  required: true, min: 1, whitespace: true, message: 'Please enter your name'
                }]
              })(
                <Input 
                  placeholder='Name' 
                  onPressEnter={this.focusNext(0)} 
                  style={inputStyle}
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('gender', {
                rules: [{
                  required: true, message: 'Please select a gender'
                }]
              })(
                <Select
                  placeholder='Gender' 
                  //placehold would disappear if assign 'value'
                  style={inputStyle}
                  onChange={this.focusNext(1)}
                  ref={this.fields[0]} 
                >
                  <Option value='male'>Male</Option>
                  <Option value='female'>Female</Option>
                  <Option value='other'>Transgender/Non-Binary</Option>
                </Select>
              )}
            </Form.Item>
          </div>
          <div className='row-wrapper' style={rowWrapperStyle}>
            <Form.Item>
              {getFieldDecorator('birthday', {
                rules: [{
                  required: true, message: 'Please enter your birthday'
                }],
              })(
                <DatePicker
                  placeholder='Birthday (mm/dd/year)'
                  style={inputStyle}
                  format={'MM/DD/YYYY'}
                  onOpenChange={this.focusNext(2)}
                  ref={this.fields[1]}
                />
              )}
            </Form.Item>
            <Form.Item>
              <Tooltip
                trigger={['focus']}
                title='Suggestion: Try 78 for the average American.'
                placement="bottomLeft"
              >
                {getFieldDecorator('lifespan', {
                  rules: [{
                    transform: (value) => {
                      value = Math.floor(value);
                      return value > 0 ? value : NaN;
                    },
                    type: 'number',
                    message: 'Please enter a positive number'
                  }]
                })(
                  <Input
                    placeholder='Expected Lifespan (years)'
                    style={inputStyle}
                    onPressEnter={this.focusNext(3)}
                    ref={this.fields[2]}
                  />
                )}
              </Tooltip>
            </Form.Item>
          </div>
          <div className='row-wrapper' style={rowWrapperStyle}>
            <Form.Item>
              <Button onClick={this.handleSubmit}>Create My Calender!</Button>
            </Form.Item>
          </div>
        </Form>
    );
  }
}

export default Form.create()(BasicInfo);

const basicInfoStyle = {
  display: 'flex',
  flexFlow: 'column wrap',
  alignItem: 'center',
  marginTop: '22px',
  marginLeft: '16px' //To offset the margin-right of .ant-form-item
}

const rowWrapperStyle = {
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'center',
}

const inputStyle = {
  width:'16em'
}

