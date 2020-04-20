import React, { Component } from "react";
import "./Content.css";


class Content extends Component {

    

  render() {
    return (
        <div>
            <section id="content">
            <div className="container">
                <div className="row">
                <div className="col-md-12">
                <div className="aligncenter"><h2 className="aligncenter">Courses</h2>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores quae porro consequatur aliquam, incidunt eius magni provident, doloribus omnis minus ovident, doloribus omnis minus temporibus perferendis nesciunt..</div>
                <br/>
                </div>
            </div>
                <div className="row">
            <div className="skill-home"> <div className="skill-home-solid clearfix"> 
            <div className="col-md-3 text-center">
            <span className="icons c1"><i className="fa fa-book"></i></span> <div className="box-area">
            <h3>Vocational Courses</h3> <p>Lorem ipsum dolor sitamet, consec tetur adipisicing elit. Dolores quae porro consequatur aliquam, incidunt eius magni provident</p></div>
            </div>
            <div className="col-md-3 text-center"> 
            <span className="icons c2"><i className="fa fa-users"></i></span> <div className="box-area">
            <h3>MassComm Courses</h3> <p>Lorem ipsum dolor sitamet, consec tetur adipisicing elit. Dolores quae porro consequatur aliquam, incidunt eius magni provident</p></div>
            </div>
            <div className="col-md-3 text-center"> 
            <span className="icons c3"><i className="fa fa-trophy"></i></span> <div className="box-area">
            <h3>Accounts</h3> <p>Lorem ipsum dolor sitamet, consec tetur adipisicing elit. Dolores quae porro consequatur aliquam, incidunt eius magni provident</p></div>
            </div>
            <div className="col-md-3 text-center"> 
            <span className="icons c4"><i className="fa fa-globe"></i></span> <div className="box-area">
            <h3>Business Management</h3> <p>Lorem ipsum dolor sitamet, consec tetur adipisicing elit. Dolores quae porro consequatur aliquam, incidunt eius magni provident</p>
            </div></div>
            </div></div>
            </div> 
            

            </div>
        </section>
        
        <section className="section-padding gray-bg">
            <div className="container">
                <div className="row">
                <div className="col-md-12">
                    <div className="section-title text-center">
                    <h2>Our Institute</h2>
                    <p>Curabitur aliquet quam id dui posuere blandit. Donec sollicitudin molestie malesuada Pellentesque <br/>ipsum id orci porta dapibus. Vivamus suscipit tortor eget felis porttitor volutpat.</p>
                    </div>
                </div>
                </div>
                <div className="row">
                <div className="col-md-6 col-sm-6">
                    <div className="about-text">
                    <p>Grids is a responsive Multipurpose Template. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur aliquet quam id dui posuere blandit. Donec sollicitudin molestie malesuada. Pellentesque in ipsum id orci porta dapibus. Vivamus suscipit tortor eget felis porttitor volutpat.</p>

                    <ul className="withArrow">
                        <li><span className="fa fa-angle-right"></span> Lorem ipsum dolor sit amet</li>
                        <li><span className="fa fa-angle-right"></span> consectetur adipiscing elit</li>
                        <li><span className="fa fa-angle-right"></span> Curabitur aliquet quam id dui</li>
                        <li><span className="fa fa-angle-right"></span> Donec sollicitudin molestie malesuada.</li>
                    </ul>
                    <a href="#" className="btn btn-primary">Learn More</a>
                    </div>
                </div>
                <div className="col-md-6 col-sm-6">
                    <div className="about-image">
                    <img src={require("../../assets/images/about.jpg")} alt="About Images" />
                    </div>
                </div>
                </div>
            </div>
        </section>	  
        
      <div className="about home-about">
              <div className="container">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="block-heading-two">
                        <h3><span>Programes</span></h3>
                      </div>
                      <p>Sed ut perspiciaatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur. <br/><br/>Sed ut perspiciaatis iste natus error sit voluptatem probably haven't heard of them accusamus.</p>
                    </div>
                    <div className="col-md-4">
                      <div className="block-heading-two">
                        <h3><span>Latest News</span></h3>
                      </div>
                      <div className="panel-group" id="accordion-alt3">
                        <div className="panel">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a data-toggle="collapse" data-parent="#accordion-alt3" href="#collapseOne-alt3">
                            <i className="fa fa-angle-right"></i> Accordion Heading Text Item # 1
                            </a>
                          </h4>
                        </div>
                        <div id="collapseOne-alt3" className="panel-collapse collapse">
                          <div className="panel-body">
                            Sed ut perspiciaatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
                          </div>
                        </div>
                        </div>
                        <div className="panel">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a data-toggle="collapse" data-parent="#accordion-alt3" href="#collapseTwo-alt3">
                            <i className="fa fa-angle-right"></i> Accordion Heading Text Item # 2
                            </a>
                          </h4>
                        </div>
                        <div id="collapseTwo-alt3" className="panel-collapse collapse">
                          <div className="panel-body">
                            Sed ut perspiciaatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
                          </div>
                        </div>
                        </div>
                        <div className="panel">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a data-toggle="collapse" data-parent="#accordion-alt3" href="#collapseThree-alt3">
                            <i className="fa fa-angle-right"></i> Accordion Heading Text Item # 3
                            </a>
                          </h4>
                        </div>
                        <div id="collapseThree-alt3" className="panel-collapse collapse">
                          <div className="panel-body">
                            Sed ut perspiciaatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
                          </div>
                        </div>
                        </div>
                        <div className="panel">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            <a data-toggle="collapse" data-parent="#accordion-alt3" href="#collapseFour-alt3">
                            <i className="fa fa-angle-right"></i> Accordion Heading Text Item # 4
                            </a>
                          </h4>
                        </div>
                        <div id="collapseFour-alt3" className="panel-collapse collapse">
                          <div className="panel-body">
                            Sed ut perspiciaatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
                          </div>
                        </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-md-4">
                      <div className="timetable">
                        <h3><span className="fa fa-clock-o"></span> Time Table</h3>
                        <hr/> 
                        <dl>
                        <dt>Monday - Friday:</dt>
                        <dd>9am-3pm</dd>
                        </dl>
                        <dl>
                        <dt>Saturday:</dt>
                        <dd>9am-1pm</dd>
                        </dl>  
                        <h4>Music Classes</h4>
                        <dl>
                        <dt>Saturday:</dt>
                        <dd>2pm-5pm</dd>
                        </dl>  
                      </div>
                    </div>
                    
                  </div>
                  
                              
                  
                  <br/>
                
          </div>
          
        </div>
        </div>
    );
  }
}

export default Content;
