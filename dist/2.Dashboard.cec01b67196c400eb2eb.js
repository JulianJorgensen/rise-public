webpackJsonp([2],{593:function(e,a,t){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n,o,r,s,c,d,u=t(13),i=l(u),f=t(14),m=l(f),_=t(15),p=l(_),h=t(17),b=l(h),E=t(16),v=l(E),C=t(1),g=l(C),N=t(122),y=(l(N),t(18)),T=t(21),D=t(117),j=(l(D),t(12),t(40)),P=t(56),k=l(P),w=t(268),U=l(w),I=t(802),J=l(I),A=(n=(0,j.UserHasPermission)("dashboard"),o=(0,T.firebaseConnect)(),r=(0,y.connect)(function(e){var a=e.firebase;return{auth:(0,T.pathToJS)(a,"auth"),account:(0,T.pathToJS)(a,"profile")}}),(0,j.UserIsAuthenticated)(s=n(s=o(s=r((d=c=function(e){function a(){var e,t,l,n;(0,m.default)(this,a);for(var o=arguments.length,r=Array(o),s=0;s<o;s++)r[s]=arguments[s];return t=l=(0,b.default)(this,(e=a.__proto__||(0,i.default)(a)).call.apply(e,[this].concat(r))),l.state={},n=t,(0,b.default)(l,n)}return(0,v.default)(a,e),(0,p.default)(a,[{key:"render",value:function(){var e=this.props,a=(e.projects,e.auth,e.account),t=a.firstName;a.timezone,a.mentor;return this.props.children?(0,C.cloneElement)(this.props.children,this.props):a?g.default.createElement("div",{className:J.default.container},g.default.createElement("div",{className:J.default.welcome},g.default.createElement("h1",null,"Welcome",t?" back, "+t:"!")),g.default.createElement("div",{className:J.default.actionsContainer},g.default.createElement("h2",null,"would you like to"),g.default.createElement("div",{className:J.default.actions},g.default.createElement("div",{className:J.default.action},g.default.createElement("i",{className:"fa fa-calendar"})),g.default.createElement("div",{className:J.default.action},g.default.createElement("i",{className:"fa fa-calendar"})),g.default.createElement("div",{className:J.default.action},g.default.createElement("i",{className:"fa fa-calendar"})))),g.default.createElement("div",{className:J.default.logs},g.default.createElement("div",{className:J.default.logsInner},g.default.createElement("div",{className:J.default.logsCompleted},g.default.createElement("h3",null,"Recently Completed")),g.default.createElement("div",{className:J.default.logsUpcoming},g.default.createElement("h3",null,"Upcoming Calls"),g.default.createElement(U.default,null))))):g.default.createElement(k.default,null)}}]),a}(C.Component),c.contextTypes={router:g.default.PropTypes.object.isRequired},c.propTypes={projects:C.PropTypes.object,firebase:C.PropTypes.object,auth:C.PropTypes.object,children:C.PropTypes.object},s=d))||s)||s)||s)||s);a.default=A},802:function(e,a){e.exports={container:"DashboardContainer__container___15kuY",welcome:"DashboardContainer__welcome___3sa-p",actionsContainer:"DashboardContainer__actionsContainer___3fK5D",actions:"DashboardContainer__actions___tapsD",action:"DashboardContainer__action___2vwTu",logs:"DashboardContainer__logs___2CkdT",logsInner:"DashboardContainer__logsInner___8LJaX",logsCompleted:"DashboardContainer__logsCompleted___aAmTT",logsUpcoming:"DashboardContainer__logsUpcoming___3L4QZ"}}});