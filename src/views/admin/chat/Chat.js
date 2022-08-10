import React from "react";

function Chat() {
  return (<>chat</>
    // <div className="nk-body bg-lighter">
    //   <div className="nk-app-root">
    //     <div className="nk-wrap ">
    //       <div className="nk-content p-0">
    //         <div className="container-fluid p-0">
    //           <div className="nk-content-inner">
    //             <div className="nk-content-body">
    //               <div className="nk-msg">
    //                 <div className="nk-msg-aside">
    //                   <div className="nk-msg-nav">
    //                     <ul className="nk-msg-menu">
    //                       <li className="nk-msg-menu-item active">
    //                         <a href="">Active</a>
    //                       </li>
    //                       <li className="nk-msg-menu-item">
    //                         <a href="">Closed</a>
    //                       </li>
    //                       <li className="nk-msg-menu-item">
    //                         <a href="">Stared</a>
    //                       </li>
    //                       <li className="nk-msg-menu-item">
    //                         <a href="">All</a>
    //                       </li>
    //                       <li className="nk-msg-menu-item ms-auto">
    //                         <a
    //                           href=""
    //                           className="search-toggle toggle-search"
    //                           data-target="search"
    //                         >
    //                           <em className="icon ni ni-search"></em>
    //                         </a>
    //                       </li>
    //                     </ul>
    //                     <div className="search-wrap" data-search="search">
    //                       <div className="search-content">
    //                         <a
    //                           href="#"
    //                           className="search-back btn btn-icon toggle-search"
    //                           data-target="search"
    //                         >
    //                           <em className="icon ni ni-arrow-left"></em>
    //                         </a>
    //                         <input
    //                           type="text"
    //                           className="form-control border-transparent form-focus-none"
    //                           placeholder="Search by user or message"
    //                         />
    //                         <button className="search-submit btn btn-icon">
    //                           <em className="icon ni ni-search"></em>
    //                         </button>
    //                       </div>
    //                     </div>
    //                   </div>
    //                   <div className="nk-msg-list" data-simplebar>
    //                     <div className="nk-msg-item current" data-msg-id="1">
    //                       <div className="nk-msg-media user-avatar">
    //                         <span>AB</span>
    //                       </div>
    //                       <div className="nk-msg-info">
    //                         <div className="nk-msg-from">
    //                           <div className="nk-msg-sender">
    //                             <div className="name">Abu Bin Ishtiyak</div>
    //                             <div className="lable-tag dot bg-pink"></div>
    //                           </div>
    //                           <div className="nk-msg-meta">
    //                             <div className="attchment">
    //                               <em className="icon ni ni-clip-h"></em>
    //                             </div>
    //                             <div className="date">12 Jan</div>
    //                           </div>
    //                         </div>
    //                         <div className="nk-msg-context">
    //                           <div className="nk-msg-text">
    //                             <h6 className="title">
    //                               Unable to select currency when order.
    //                             </h6>
    //                             <p>
    //                               Hello team, I am facing problem as i can not
    //                               select currency on buy order page.
    //                             </p>
    //                           </div>
    //                           <div className="nk-msg-lables">
    //                             <div className="asterisk">
    //                               <a href="#">
    //                                 <em className="asterisk-off icon ni ni-star"></em>
    //                                 <em className="asterisk-on icon ni ni-star-fill"></em>
    //                               </a>
    //                             </div>
    //                           </div>
    //                         </div>
    //                       </div>
    //                     </div>
    //                     <div className="nk-msg-item" data-msg-id="2">
    //                       <div className="nk-msg-media user-avatar">
    //                         <img src="./images/avatar/b-sm.jpg" alt="" />
    //                       </div>
    //                       <div className="nk-msg-info">
    //                         <div className="nk-msg-from">
    //                           <div className="nk-msg-sender">
    //                             <div className="name">Jackelyn Dugas</div>
    //                           </div>
    //                           <div className="nk-msg-meta">
    //                             <div className="date">15 Jan</div>
    //                           </div>
    //                         </div>
    //                         <div className="nk-msg-context">
    //                           <div className="nk-msg-text">
    //                             <h6 className="title">
    //                               Have not received bitcoin yet.
    //                             </h6>
    //                             <p>
    //                               Hey! I recently bitcoin from you. But still
    //                               have not received yet.
    //                             </p>
    //                           </div>
    //                           <div className="nk-msg-lables">
    //                             <div className="asterisk">
    //                               <a className="active" href="#">
    //                                 <em className="asterisk-off icon ni ni-star"></em>
    //                                 <em className="asterisk-on icon ni ni-star-fill"></em>
    //                               </a>
    //                             </div>
    //                           </div>
    //                         </div>
    //                       </div>
    //                     </div>
    //                     <div className="nk-msg-item is-unread" data-msg-id="3">
    //                       <div className="nk-msg-media user-avatar bg-purple">
    //                         <span>MJ</span>
    //                       </div>
    //                       <div className="nk-msg-info">
    //                         <div className="nk-msg-from">
    //                           <div className="nk-msg-sender">
    //                             <div className="name">Mayme Johnston</div>
    //                           </div>
    //                           <div className="nk-msg-meta">
    //                             <div className="date">11 Jan</div>
    //                           </div>
    //                         </div>
    //                         <div className="nk-msg-context">
    //                           <div className="nk-msg-text">
    //                             <h6 className="title">
    //                               I can not submit kyc application
    //                             </h6>
    //                             <p>
    //                               Hello support! I can not upload my documents
    //                               on kyc application.
    //                             </p>
    //                           </div>
    //                           <div className="nk-msg-lables">
    //                             <div className="unread">
    //                               <span className="badge bg-primary">2</span>
    //                             </div>
    //                             <div className="asterisk">
    //                               <a href="#">
    //                                 <em className="asterisk-off icon ni ni-star"></em>
    //                                 <em className="asterisk-on icon ni ni-star-fill"></em>
    //                               </a>
    //                             </div>
    //                           </div>
    //                         </div>
    //                       </div>
    //                     </div>
    //                     <div className="nk-msg-item" data-msg-id="133">
    //                       <div className="nk-msg-media user-avatar">
    //                         <img src="./images/avatar/c-sm.jpg" alt="" />
    //                       </div>
    //                       <div className="nk-msg-info">
    //                         <div className="nk-msg-from">
    //                           <div className="nk-msg-sender">
    //                             <div className="name">Jake Smityh</div>
    //                             <div className="lable-tag dot bg-pink"></div>
    //                           </div>
    //                           <div className="nk-msg-meta">
    //                             <div className="date">30 Dec, 2019</div>
    //                           </div>
    //                         </div>
    //                         <div className="nk-msg-context">
    //                           <div className="nk-msg-text">
    //                             <h6 className="title">
    //                               Have not received bitcoin yet.
    //                             </h6>
    //                             <p>
    //                               Hey! I recently bitcoin from you. But still
    //                               have not received yet.
    //                             </p>
    //                           </div>
    //                           <div className="nk-msg-lables">
    //                             <div className="asterisk">
    //                               <a href="#">
    //                                 <em className="asterisk-off icon ni ni-star"></em>
    //                                 <em className="asterisk-on icon ni ni-star-fill"></em>
    //                               </a>
    //                             </div>
    //                           </div>
    //                         </div>
    //                       </div>
    //                     </div>
    //                     <div className="nk-msg-item" data-msg-id="12">
    //                       <div className="nk-msg-media user-avatar">
    //                         <img src="./images/avatar/d-sm.jpg" alt="" />
    //                       </div>
    //                       <div className="nk-msg-info">
    //                         <div className="nk-msg-from">
    //                           <div className="nk-msg-sender">
    //                             <div className="name">Amanda Moore</div>
    //                           </div>
    //                           <div className="nk-msg-meta">
    //                             <div className="date">28 Dec, 2019</div>
    //                           </div>
    //                         </div>
    //                         <div className="nk-msg-context">
    //                           <div className="nk-msg-text">
    //                             <h6 className="title">
    //                               Wallet needs to verify.
    //                             </h6>
    //                             <p>
    //                               Hello, I already varified my Wallet but it
    //                               still showing needs to verify alert.
    //                             </p>
    //                           </div>
    //                           <div className="nk-msg-lables">
    //                             <div className="asterisk">
    //                               <a href="#">
    //                                 <em className="asterisk-off icon ni ni-star"></em>
    //                                 <em className="asterisk-on icon ni ni-star-fill"></em>
    //                               </a>
    //                             </div>
    //                           </div>
    //                         </div>
    //                       </div>
    //                     </div>
    //                     <div className="nk-msg-item" data-msg-id="1">
    //                       <div className="nk-msg-media user-avatar bg-blue">
    //                         <span>RV</span>
    //                       </div>
    //                       <div className="nk-msg-info">
    //                         <div className="nk-msg-from">
    //                           <div className="nk-msg-sender">
    //                             <div className="name">Rebecca Valdez</div>
    //                           </div>
    //                           <div className="nk-msg-meta">
    //                             <div className="date">26 Dec, 2019</div>
    //                           </div>
    //                         </div>
    //                         <div className="nk-msg-context">
    //                           <div className="nk-msg-text">
    //                             <h6 className="title">I want my money back.</h6>
    //                             <p>
    //                               Hey! I don't want to stay as your subscriber
    //                               any more, Also i want my mony back.
    //                             </p>
    //                           </div>
    //                           <div className="nk-msg-lables">
    //                             <div className="asterisk">
    //                               <a href="#">
    //                                 <em className="asterisk-off icon ni ni-star"></em>
    //                                 <em className="asterisk-on icon ni ni-star-fill"></em>
    //                               </a>
    //                             </div>
    //                           </div>
    //                         </div>
    //                       </div>
    //                     </div>
    //                     <div className="nk-msg-item" data-msg-id="1">
    //                       <div className="nk-msg-media user-avatar bg-orange">
    //                         <span>CG</span>
    //                       </div>
    //                       <div className="nk-msg-info">
    //                         <div className="nk-msg-from">
    //                           <div className="nk-msg-sender">
    //                             <div className="name">Charles Greene</div>
    //                           </div>
    //                           <div className="nk-msg-meta">
    //                             <div className="date">21 Dec, 2019</div>
    //                           </div>
    //                         </div>
    //                         <div className="nk-msg-context">
    //                           <div className="nk-msg-text">
    //                             <h6 className="title">
    //                               Have not received bitcoin yet.
    //                             </h6>
    //                             <p>
    //                               Hey! I recently bitcoin from you. But still
    //                               have not received yet.
    //                             </p>
    //                           </div>
    //                           <div className="nk-msg-lables">
    //                             <div className="asterisk">
    //                               <a href="#">
    //                                 <em className="asterisk-off icon ni ni-star"></em>
    //                                 <em className="asterisk-on icon ni ni-star-fill"></em>
    //                               </a>
    //                             </div>
    //                           </div>
    //                         </div>
    //                       </div>
    //                     </div>
    //                     <div className="nk-msg-item" data-msg-id="1">
    //                       <div className="nk-msg-media user-avatar bg-success">
    //                         <span>EA</span>
    //                       </div>
    //                       <div className="nk-msg-info">
    //                         <div className="nk-msg-from">
    //                           <div className="nk-msg-sender">
    //                             <div className="name">Ethan Anderson</div>
    //                           </div>
    //                           <div className="nk-msg-meta">
    //                             <div className="date">16 Dec, 2019</div>
    //                           </div>
    //                         </div>
    //                         <div className="nk-msg-context">
    //                           <div className="nk-msg-text">
    //                             <h6 className="title">
    //                               Unable to select currency when order.
    //                             </h6>
    //                             <p>
    //                               Hello team, I am facing problem as i can not
    //                               select currency on buy order page.
    //                             </p>
    //                           </div>
    //                           <div className="nk-msg-lables">
    //                             <div className="asterisk">
    //                               <a href="#">
    //                                 <em className="asterisk-off icon ni ni-star"></em>
    //                                 <em className="asterisk-on icon ni ni-star-fill"></em>
    //                               </a>
    //                             </div>
    //                           </div>
    //                         </div>
    //                       </div>
    //                     </div>
    //                     <div className="nk-msg-item" data-msg-id="1">
    //                       <div className="nk-msg-media user-avatar">
    //                         <img src="./images/avatar/c-sm.jpg" alt="" />
    //                       </div>
    //                       <div className="nk-msg-info">
    //                         <div className="nk-msg-from">
    //                           <div className="nk-msg-sender">
    //                             <div className="name">Jose Peterson</div>
    //                             <div className="lable-tag dot bg-pink"></div>
    //                           </div>
    //                           <div className="nk-msg-meta">
    //                             <div className="date">14 Dec, 2019</div>
    //                           </div>
    //                         </div>
    //                         <div className="nk-msg-context">
    //                           <div className="nk-msg-text">
    //                             <h6 className="title">
    //                               Have not received bitcoin yet.
    //                             </h6>
    //                             <p>
    //                               Hey! I recently bitcoin from you. But still
    //                               have not received yet.
    //                             </p>
    //                           </div>
    //                           <div className="nk-msg-lables">
    //                             <div className="asterisk">
    //                               <a href="#">
    //                                 <em className="asterisk-off icon ni ni-star"></em>
    //                                 <em className="asterisk-on icon ni ni-star-fill"></em>
    //                               </a>
    //                             </div>
    //                           </div>
    //                         </div>
    //                       </div>
    //                     </div>
    //                     <div className="nk-msg-item" data-msg-id="12">
    //                       <div className="nk-msg-media user-avatar">
    //                         <img src="./images/avatar/d-sm.jpg" alt="" />
    //                       </div>
    //                       <div className="nk-msg-info">
    //                         <div className="nk-msg-from">
    //                           <div className="nk-msg-sender">
    //                             <div className="name">Amanda Moore</div>
    //                           </div>
    //                           <div className="nk-msg-meta">
    //                             <div className="date">12 Dec, 2019</div>
    //                           </div>
    //                         </div>
    //                         <div className="nk-msg-context">
    //                           <div className="nk-msg-text">
    //                             <h6 className="title">
    //                               Wallet needs to verify.
    //                             </h6>
    //                             <p>
    //                               Hello, I already varified my Wallet but it
    //                               still showing needs to verify alert.
    //                             </p>
    //                           </div>
    //                           <div className="nk-msg-lables">
    //                             <div className="asterisk">
    //                               <a href="#">
    //                                 <em className="asterisk-off icon ni ni-star"></em>
    //                                 <em className="asterisk-on icon ni ni-star-fill"></em>
    //                               </a>
    //                             </div>
    //                           </div>
    //                         </div>
    //                       </div>
    //                     </div>
    //                     <div className="nk-msg-item" data-msg-id="3">
    //                       <div className="nk-msg-media user-avatar bg-purple">
    //                         <span>MJ</span>
    //                       </div>
    //                       <div className="nk-msg-info">
    //                         <div className="nk-msg-from">
    //                           <div className="nk-msg-sender">
    //                             <div className="name">Mayme Johnston</div>
    //                           </div>
    //                           <div className="nk-msg-meta">
    //                             <div className="date">09 Dec, 2019</div>
    //                           </div>
    //                         </div>
    //                         <div className="nk-msg-context">
    //                           <div className="nk-msg-text">
    //                             <h6 className="title">
    //                               I can not submit kyc application
    //                             </h6>
    //                             <p>
    //                               Hello support! I can not upload my documents
    //                               on kyc application.
    //                             </p>
    //                           </div>
    //                           <div className="nk-msg-lables">
    //                             <div className="asterisk">
    //                               <a href="#">
    //                                 <em className="asterisk-off icon ni ni-star"></em>
    //                                 <em className="asterisk-on icon ni ni-star-fill"></em>
    //                               </a>
    //                             </div>
    //                           </div>
    //                         </div>
    //                       </div>
    //                     </div>
    //                   </div>
    //                 </div>
    //                 <div className="nk-msg-body bg-white profile-shown">
    //                   <div className="nk-msg-head">
    //                     <h4 className="title d-none d-lg-block">
    //                       Unable to select currency when order
    //                     </h4>
    //                     <div className="nk-msg-head-meta">
    //                       <div className="d-none d-lg-block">
    //                         <ul className="nk-msg-tags">
    //                           <li>
    //                             <span className="label-tag">
    //                               <em className="icon ni ni-flag-fill"></em>{" "}
    //                               <span>Technical Problem</span>
    //                             </span>
    //                           </li>
    //                         </ul>
    //                       </div>
    //                       <div className="d-lg-none">
    //                         <a
    //                           href="#"
    //                           className="btn btn-icon btn-trigger nk-msg-hide ms-n1"
    //                         >
    //                           <em className="icon ni ni-arrow-left"></em>
    //                         </a>
    //                       </div>
    //                       <ul className="nk-msg-actions">
    //                         <li>
    //                           <a
    //                             href="#"
    //                             className="btn btn-dim btn-sm btn-outline-light"
    //                           >
    //                             <em className="icon ni ni-check"></em>
    //                             <span>Mark as Closed</span>
    //                           </a>
    //                         </li>
    //                         <li className="d-lg-none">
    //                           <a
    //                             href="#"
    //                             className="btn btn-icon btn-sm btn-white btn-light profile-toggle"
    //                           >
    //                             <em className="icon ni ni-info-i"></em>
    //                           </a>
    //                         </li>
    //                         <li className="dropdown">
    //                           <a
    //                             href="#"
    //                             className="btn btn-icon btn-sm btn-white btn-light dropdown-toggle"
    //                             data-bs-toggle="dropdown"
    //                           >
    //                             <em className="icon ni ni-more-h"></em>
    //                           </a>
    //                           <div className="dropdown-menu dropdown-menu-end">
    //                             <ul className="link-list-opt no-bdr">
    //                               <li>
    //                                 <a href="#">
    //                                   <em className="icon ni ni-user-add"></em>
    //                                   <span>Assign To Member</span>
    //                                 </a>
    //                               </li>
    //                               <li>
    //                                 <a href="#">
    //                                   <em className="icon ni ni-archive"></em>
    //                                   <span>Move to Archive</span>
    //                                 </a>
    //                               </li>
    //                               <li>
    //                                 <a href="#">
    //                                   <em className="icon ni ni-done"></em>
    //                                   <span>Mark as Close</span>
    //                                 </a>
    //                               </li>
    //                             </ul>
    //                           </div>
    //                         </li>
    //                       </ul>
    //                     </div>
    //                     <a
    //                       href="#"
    //                       className="nk-msg-profile-toggle profile-toggle active"
    //                     >
    //                       <em className="icon ni ni-arrow-left"></em>
    //                     </a>
    //                   </div>
    //                   <div className="nk-msg-reply nk-reply" data-simplebar>
    //                     <div className="nk-msg-head py-4 d-lg-none">
    //                       <h4 className="title">
    //                         Unable to select currency when order
    //                       </h4>
    //                       <ul className="nk-msg-tags">
    //                         <li>
    //                           <span className="label-tag">
    //                             <em className="icon ni ni-flag-fill"></em>{" "}
    //                             <span>Technical Problem</span>
    //                           </span>
    //                         </li>
    //                       </ul>
    //                     </div>
    //                     <div className="nk-reply-item">
    //                       <div className="nk-reply-header">
    //                         <div className="user-card">
    //                           <div className="user-avatar sm bg-blue">
    //                             <span>AB</span>
    //                           </div>
    //                           <div className="user-name">Abu Bin Ishtiyak</div>
    //                         </div>
    //                         <div className="date-time">14 Jan, 2020</div>
    //                       </div>
    //                       <div className="nk-reply-body">
    //                         <div className="nk-reply-entry entry">
    //                           <p>Hello team,</p>
    //                           <p>
    //                             I am facing problem as i can not select currency
    //                             on buy order page. Can you guys let me know what
    //                             i am doing doing wrong? Please check attached
    //                             files.
    //                           </p>
    //                           <p>
    //                             Thank you <br /> Ishityak
    //                           </p>
    //                         </div>
    //                         <div className="attach-files">
    //                           <ul className="attach-list">
    //                             <li className="attach-item">
    //                               <a className="download" href="#">
    //                                 <em className="icon ni ni-img"></em>
    //                                 <span>error-show-On-order.jpg</span>
    //                               </a>
    //                             </li>
    //                             <li className="attach-item">
    //                               <a className="download" href="#">
    //                                 <em className="icon ni ni-img"></em>
    //                                 <span>full-page-error.jpg</span>
    //                               </a>
    //                             </li>
    //                           </ul>
    //                           <div className="attach-foot">
    //                             <span className="attach-info">
    //                               2 files attached
    //                             </span>
    //                             <a className="attach-download link" href="#">
    //                               <em className="icon ni ni-download"></em>
    //                               <span>Download All</span>
    //                             </a>
    //                           </div>
    //                         </div>
    //                       </div>
    //                     </div>
    //                     <div className="nk-reply-item">
    //                       <div className="nk-reply-header">
    //                         <div className="user-card">
    //                           <div className="user-avatar sm bg-pink">
    //                             <span>ST</span>
    //                           </div>
    //                           <div className="user-name">
    //                             Support Team <span>(You)</span>
    //                           </div>
    //                         </div>
    //                         <div className="date-time">14 Jan, 2020</div>
    //                       </div>
    //                       <div className="nk-reply-body">
    //                         <div className="nk-reply-entry entry">
    //                           <p>Hello Ishtiyak,</p>
    //                           <p>
    //                             We are really sorry to hear that, you have face
    //                             an unexpected experience. Our team urgently look
    //                             this matter and get back to you asap.{" "}
    //                           </p>
    //                           <p>Thank you very much. </p>
    //                         </div>
    //                         <div className="nk-reply-from">
    //                           {" "}
    //                           Replied by <span>Iliash Hossain</span> at 11:32 AM{" "}
    //                         </div>
    //                       </div>
    //                     </div>
    //                     <div className="nk-reply-meta">
    //                       <div className="nk-reply-meta-info">
    //                         <span className="who">Iliash Hossian</span> assigned
    //                         user: <span className="whom">Saiful Islam</span> at
    //                         14 Jan, 2020 at 11:34 AM
    //                       </div>
    //                     </div>
    //                     <div className="nk-reply-item">
    //                       <div className="nk-reply-header">
    //                         <div className="user-card">
    //                           <div className="user-avatar sm bg-purple">
    //                             <span>IH</span>
    //                           </div>
    //                           <div className="user-name">
    //                             Iliash Hossain <span>added a note</span>
    //                           </div>
    //                         </div>
    //                         <div className="date-time">14 Jan, 2020</div>
    //                       </div>
    //                       <div className="nk-reply-body">
    //                         <div className="nk-reply-entry entry note">
    //                           <p>Devement Team need to check out the issues.</p>
    //                         </div>
    //                       </div>
    //                     </div>
    //                     <div className="nk-reply-meta">
    //                       <div className="nk-reply-meta-info">
    //                         <strong>15 January 2020</strong>
    //                       </div>
    //                     </div>
    //                     <div className="nk-reply-item">
    //                       <div className="nk-reply-header">
    //                         <div className="user-card">
    //                           <div className="user-avatar sm bg-pink">
    //                             <span>ST</span>
    //                           </div>
    //                           <div className="user-name">
    //                             Support Team <span>(You)</span>
    //                           </div>
    //                         </div>
    //                         <div className="date-time">15 Jan, 2020</div>
    //                       </div>
    //                       <div className="nk-reply-body">
    //                         <div className="nk-reply-entry entry">
    //                           <p>Hello Ishtiyak,</p>
    //                           <p>
    //                             Thanks for waiting for us. Our team solved the
    //                             issues. So check now on our website. Hopefuly
    //                             you can order now.
    //                           </p>
    //                           <p>Thank you very much once again.</p>
    //                         </div>
    //                         <div className="nk-reply-from">
    //                           {" "}
    //                           Replied by <span>Noor Parvez</span> at 11:32 AM{" "}
    //                         </div>
    //                       </div>
    //                     </div>
    //                     <div className="nk-reply-form">
    //                       <div className="nk-reply-form-header">
    //                         <ul className="nav nav-tabs-s2 nav-tabs nav-tabs-sm">
    //                           <li className="nav-item">
    //                             <a
    //                               className="nav-link active"
    //                               data-bs-toggle="tab"
    //                               href="#reply-form"
    //                             >
    //                               Reply
    //                             </a>
    //                           </li>
    //                           <li className="nav-item">
    //                             <a
    //                               className="nav-link"
    //                               data-bs-toggle="tab"
    //                               href="#note-form"
    //                             >
    //                               Private Note
    //                             </a>
    //                           </li>
    //                         </ul>
    //                         <div className="nk-reply-form-title">
    //                           <div className="title">Reply as:</div>
    //                           <div className="user-avatar xs bg-purple">
    //                             <span>IH</span>
    //                           </div>
    //                         </div>
    //                       </div>
    //                       <div className="tab-content">
    //                         <div className="tab-pane active" id="reply-form">
    //                           <div className="nk-reply-form-editor">
    //                             <div className="nk-reply-form-field">
    //                               <textarea
    //                                 className="form-control form-control-simple no-resize"
    //                                 placeholder="Hello"
    //                               ></textarea>
    //                             </div>
    //                             <div className="nk-reply-form-tools">
    //                               <ul className="nk-reply-form-actions g-1">
    //                                 <li className="me-2">
    //                                   <button
    //                                     className="btn btn-primary"
    //                                     type="submit"
    //                                   >
    //                                     Reply
    //                                   </button>
    //                                 </li>
    //                                 <li>
    //                                   <div className="dropdown">
    //                                     <a
    //                                       className="btn btn-icon btn-sm"
    //                                       data-bs-toggle="dropdown"
    //                                       href="#"
    //                                     >
    //                                       <em
    //                                         className="icon ni ni-hash"
    //                                         data-bs-toggle="tooltip"
    //                                         data-bs-placement="top"
    //                                         title="Template"
    //                                       ></em>
    //                                     </a>
    //                                     <div className="dropdown-menu">
    //                                       <ul className="link-list-opt no-bdr link-list-template">
    //                                         <li className="opt-head">
    //                                           <span>Quick Insert</span>
    //                                         </li>
    //                                         <li>
    //                                           <a href="#">
    //                                             <span>Thank you message</span>
    //                                           </a>
    //                                         </li>
    //                                         <li>
    //                                           <a href="#">
    //                                             <span>Your issues solved</span>
    //                                           </a>
    //                                         </li>
    //                                         <li>
    //                                           <a href="#">
    //                                             <span>Thank you message</span>
    //                                           </a>
    //                                         </li>
    //                                         <li className="divider" />
    //                                         <li>
    //                                           <a href="#">
    //                                             <em className="icon ni ni-file-plus"></em>
    //                                             <span>Save as Template</span>
    //                                           </a>
    //                                         </li>
    //                                         <li>
    //                                           <a href="#">
    //                                             <em className="icon ni ni-notes-alt"></em>
    //                                             <span>Manage Template</span>
    //                                           </a>
    //                                         </li>
    //                                       </ul>
    //                                     </div>
    //                                   </div>
    //                                 </li>
    //                                 <li>
    //                                   <a
    //                                     className="btn btn-icon btn-sm"
    //                                     data-bs-toggle="tooltip"
    //                                     data-bs-placement="top"
    //                                     title="Upload Attachment"
    //                                     href="#"
    //                                   >
    //                                     <em className="icon ni ni-clip-v"></em>
    //                                   </a>
    //                                 </li>
    //                                 <li>
    //                                   <a
    //                                     className="btn btn-icon btn-sm"
    //                                     data-bs-toggle="tooltip"
    //                                     data-bs-placement="top"
    //                                     title="Insert Emoji"
    //                                     href="#"
    //                                   >
    //                                     <em className="icon ni ni-happy"></em>
    //                                   </a>
    //                                 </li>
    //                                 <li>
    //                                   <a
    //                                     className="btn btn-icon btn-sm"
    //                                     data-bs-toggle="tooltip"
    //                                     data-bs-placement="top"
    //                                     title="Upload Images"
    //                                     href="#"
    //                                   >
    //                                     <em className="icon ni ni-img"></em>
    //                                   </a>
    //                                 </li>
    //                               </ul>
    //                               <div className="dropdown">
    //                                 <a
    //                                   href="#"
    //                                   className="dropdown-toggle btn-trigger btn btn-icon me-n2"
    //                                   data-bs-toggle="dropdown"
    //                                 >
    //                                   <em className="icon ni ni-more-v"></em>
    //                                 </a>
    //                                 <div className="dropdown-menu dropdown-menu-end">
    //                                   <ul className="link-list-opt no-bdr">
    //                                     <li>
    //                                       <a href="#">
    //                                         <span>Another Option</span>
    //                                       </a>
    //                                     </li>
    //                                     <li>
    //                                       <a href="#">
    //                                         <span>More Option</span>
    //                                       </a>
    //                                     </li>
    //                                   </ul>
    //                                 </div>
    //                               </div>
    //                             </div>
    //                           </div>
    //                         </div>
    //                         <div className="tab-pane" id="note-form">
    //                           <div className="nk-reply-form-editor">
    //                             <div className="nk-reply-form-field">
    //                               <textarea
    //                                 className="form-control form-control-simple no-resize"
    //                                 placeholder="Type your private note, that only visible to internal team."
    //                               ></textarea>
    //                             </div>
    //                             <div className="nk-reply-form-tools">
    //                               <ul className="nk-reply-form-actions g-1">
    //                                 <li className="me-2">
    //                                   <button
    //                                     className="btn btn-primary"
    //                                     type="submit"
    //                                   >
    //                                     Add Note
    //                                   </button>
    //                                 </li>
    //                                 <li>
    //                                   <a
    //                                     className="btn btn-icon btn-sm"
    //                                     data-bs-toggle="tooltip"
    //                                     data-bs-placement="top"
    //                                     title="Upload Attachment"
    //                                     href="#"
    //                                   >
    //                                     <em className="icon ni ni-clip-v"></em>
    //                                   </a>
    //                                 </li>
    //                               </ul>
    //                               <div className="dropdown">
    //                                 <a
    //                                   href="#"
    //                                   className="dropdown-toggle btn-trigger btn btn-icon me-n2"
    //                                   data-bs-toggle="dropdown"
    //                                 >
    //                                   <em className="icon ni ni-more-v"></em>
    //                                 </a>
    //                                 <div className="dropdown-menu dropdown-menu-end">
    //                                   <ul className="link-list-opt no-bdr">
    //                                     <li>
    //                                       <a href="#">
    //                                         <span>Another Option</span>
    //                                       </a>
    //                                     </li>
    //                                     <li>
    //                                       <a href="#">
    //                                         <span>More Option</span>
    //                                       </a>
    //                                     </li>
    //                                   </ul>
    //                                 </div>
    //                               </div>
    //                             </div>
    //                           </div>
    //                         </div>
    //                       </div>
    //                     </div>
    //                   </div>
    //                   <div className="nk-msg-profile visible" data-simplebar>
    //                     <div className="card">
    //                       <div className="card-inner-group">
    //                         <div className="card-inner">
    //                           <div className="user-card user-card-s2 mb-2">
    //                             <div className="user-avatar md bg-primary">
    //                               <span>AB</span>
    //                             </div>
    //                             <div className="user-info">
    //                               <h5>Abu Bin Ishtiyak</h5>
    //                               <span className="sub-text">Customer</span>
    //                             </div>
    //                             <div className="user-card-menu dropdown">
    //                               <a
    //                                 href="#"
    //                                 className="btn btn-icon btn-sm btn-trigger dropdown-toggle"
    //                                 data-bs-toggle="dropdown"
    //                               >
    //                                 <em className="icon ni ni-more-h"></em>
    //                               </a>
    //                               <div className="dropdown-menu dropdown-menu-end">
    //                                 <ul className="link-list-opt no-bdr">
    //                                   <li>
    //                                     <a href="#">
    //                                       <em className="icon ni ni-eye"></em>
    //                                       <span>View Profile</span>
    //                                     </a>
    //                                   </li>
    //                                   <li>
    //                                     <a href="#">
    //                                       <em className="icon ni ni-na"></em>
    //                                       <span>Ban From System</span>
    //                                     </a>
    //                                   </li>
    //                                   <li>
    //                                     <a href="#">
    //                                       <em className="icon ni ni-repeat"></em>
    //                                       <span>View Orders</span>
    //                                     </a>
    //                                   </li>
    //                                 </ul>
    //                               </div>
    //                             </div>
    //                           </div>
    //                           <div className="row text-center g-1">
    //                             <div className="col-4">
    //                               <div className="profile-stats">
    //                                 <span className="amount">23</span>
    //                                 <span className="sub-text">
    //                                   Total Order
    //                                 </span>
    //                               </div>
    //                             </div>
    //                             <div className="col-4">
    //                               <div className="profile-stats">
    //                                 <span className="amount">20</span>
    //                                 <span className="sub-text">Complete</span>
    //                               </div>
    //                             </div>
    //                             <div className="col-4">
    //                               <div className="profile-stats">
    //                                 <span className="amount">3</span>
    //                                 <span className="sub-text">Progress</span>
    //                               </div>
    //                             </div>
    //                           </div>
    //                         </div>
    //                         <div className="card-inner">
    //                           <div className="aside-wg">
    //                             <h6 className="overline-title-alt mb-2">
    //                               User Information
    //                             </h6>
    //                             <ul className="user-contacts">
    //                               <li>
    //                                 <em className="icon ni ni-mail"></em>
    //                                 <span>info@softnio.com</span>
    //                               </li>
    //                               <li>
    //                                 <em className="icon ni ni-call"></em>
    //                                 <span>+938392939</span>
    //                               </li>
    //                               <li>
    //                                 <em className="icon ni ni-map-pin"></em>
    //                                 <span>
    //                                   1134 Ridder Park Road <br />
    //                                   San Fransisco, CA 94851
    //                                 </span>
    //                               </li>
    //                             </ul>
    //                           </div>
    //                           <div className="aside-wg">
    //                             <h6 className="overline-title-alt mb-2">
    //                               Additional
    //                             </h6>
    //                             <div className="row gx-1 gy-3">
    //                               <div className="col-6">
    //                                 <span className="sub-text">Ref ID: </span>
    //                                 <span>TID-049583</span>
    //                               </div>
    //                               <div className="col-6">
    //                                 <span className="sub-text">Requested:</span>
    //                                 <span>Abu Bin Ishtiak</span>
    //                               </div>
    //                               <div className="col-6">
    //                                 <span className="sub-text">Status:</span>
    //                                 <span className="lead-text text-success">
    //                                   Open
    //                                 </span>
    //                               </div>
    //                               <div className="col-6">
    //                                 <span className="sub-text">
    //                                   Last Reply:
    //                                 </span>
    //                                 <span>Abu Bin Ishtiak</span>
    //                               </div>
    //                             </div>
    //                           </div>
    //                           <div className="aside-wg">
    //                             <h6 className="overline-title-alt mb-2">
    //                               Assigned Account
    //                             </h6>
    //                             <ul className="align-center g-2">
    //                               <li>
    //                                 <div className="user-avatar bg-purple">
    //                                   <span>IH</span>
    //                                 </div>
    //                               </li>
    //                               <li>
    //                                 <div className="user-avatar bg-pink">
    //                                   <span>ST</span>
    //                                 </div>
    //                               </li>
    //                               <li>
    //                                 <div className="user-avatar bg-gray">
    //                                   <span>SI</span>
    //                                 </div>
    //                               </li>
    //                             </ul>
    //                           </div>
    //                         </div>
    //                       </div>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default Chat;
