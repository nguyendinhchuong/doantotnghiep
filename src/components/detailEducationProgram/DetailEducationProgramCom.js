import React from "react";
import { Row, Col } from "shards-react";
import {Fieldset} from 'primereact/fieldset';
import {Button} from 'primereact/button';

import '../../assets/target-education.css'

import * as logic from '../../business/logicEducationProgram'


export default class DetailEducationProgramCom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      educations1:[
        {id:1, key:'1',value:'Mục Tiêu Đào Tạo',title:''},
        {id:2, key:'1.1',value:'Mục Tiêu Chung',
          title:'Mục tiêu của chương trình đào tạo nhằm đào tạo ra các sinh viên tốt nghiệp:'},
        {id:3, key:'1.2',value:'MỤC TIÊU CỤ THỂ – CHUẨN ĐẦU RA CỦA CHƯƠNG TRÌNH ĐÀO TẠO',title:''},
        {id:4, key:'1.2.1',value:'Mục tiêu cụ thể',title:''},
        {id:5, key:'1.2.2',value:'Chuẩn đầu ra của chương trình giáo dục',title:'',idOutcome:''},
        {id:6, key:'1.3',value:'Cơ hội nghề nghiệp',title:'Sinh viên sau khi tốt nghiệp có thể có các cơ hội nghề nghiệp sau:'}
      ],
      educations2: [
        {id:1, key:'2',value:'Thời gian đào tạo',title:''}
      ],
      educations3: [
        {id:1, key:'3',value:'Khối kiến thức toàn khóa',title:''}
      ],
      educations4: [
        {id:1, key:'4',value:'Đối tượng tuyển sinh',
          title:'Theo Quy chế tuyển sinh đại học, cao đẳng hệ chính quy của Bộ Giáo dục và Đào tạo'},
      ],
      educations5: [
        {id:1, key:'5',value:'Quy trình đào tạo , Điều kiện tốt nghiệp',title:''},
        {id:2, key:'5.1',value:'Quy Trình Đào Tạo',title:'abc'},
        {id:3, key:'5.2',value:'Điều Kiện Tốt Nghiệp',title:'abc'}
      ]
    };
  }

  displayKeyValue = (educations,index) =>{
    return educations[index].key+'. ' +educations[index].value ;
  }

  classNameEdu = (educations,index)=>{
    return  "edu"+educations[index].key;
  }

  addValue = (educations,index) =>{
    this.setState({educations1: logic.addNew(educations,index,'abc')});
    const x = logic.getItemOfIndex(educations,index);
    console.log(x);
  }

  render() {
    return (
      <div className="p-grid content-section implementation">
        <Row noGutters className="page-header py-4">
          <Col lg="12" md="12" sm="12">
            {/* Row 1 */}
            <Fieldset legend={this.displayKeyValue(this.state.educations1,0)}
              toggleable={true} collapsed={true} className={this.classNameEdu(this.state.educations1,0)}>
              {/* row 1.1 */}
              <Fieldset legend={this.displayKeyValue(this.state.educations1,1)} toggleable={true} collapsed={true}>
                <label>{this.state.educations1[1].title}</label>
                <Row style={{'paddingLeft':'20px'}}>
                  <Button label="Add New" icon="fas fa-plus" iconPos="right" onClick={()=>this.addValue(this.state.educations1,1)}/>
                </Row>
                <Row style={{'paddingLeft':'20px'}}>
                  <ul>
                  {
                    logic.getItemOfIndex(this.state.educations1,1).map((item)=>{
                      return <li key={item.key}>{item.value}</li>
                    })
                  }
                  </ul>
                </Row>
              </Fieldset>
              {/* row 1.2 */}
              <Fieldset legend={this.displayKeyValue(this.state.educations1,2)} toggleable={true} collapsed={true}>
                <Fieldset legend={this.displayKeyValue(this.state.educations1,3)} toggleable={true} collapsed={true}>

                </Fieldset>
                <Fieldset legend={this.displayKeyValue(this.state.educations1,4)} toggleable={true} collapsed={true}>

                </Fieldset>
              </Fieldset>
              {/* row 1.3 */}
              <Fieldset legend={this.displayKeyValue(this.state.educations1,5)} toggleable={true} collapsed={true}>

              </Fieldset>
            </Fieldset>
            {/* Row 2 */}
            <Fieldset legend={this.displayKeyValue(this.state.educations2,0)} toggleable={true} collapsed={true}>

            </Fieldset>
            {/* Row 3 */}
            <Fieldset legend={this.displayKeyValue(this.state.educations3,0)} toggleable={true} collapsed={true}>

            </Fieldset>
            {/* Row 4 */}
            <Fieldset legend={this.displayKeyValue(this.state.educations4,0)} toggleable={true} collapsed={true}>

            </Fieldset>
            {/* Row 5 */}
            <Fieldset legend={this.displayKeyValue(this.state.educations5,0)} toggleable={true} collapsed={true}>

            </Fieldset>
          </Col>
        </Row>
      </div>
    );
  }
}
