(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{135:function(e,t,a){e.exports=a(267)},140:function(e,t,a){},141:function(e,t,a){},142:function(e,t,a){},169:function(e,t){},172:function(e,t,a){},173:function(e,t,a){},174:function(e,t,a){},241:function(e,t,a){},242:function(e,t,a){},243:function(e,t,a){},244:function(e,t,a){},261:function(e,t,a){},262:function(e,t,a){},263:function(e,t,a){},264:function(e,t,a){},267:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),r=a(126),c=a.n(r),i=(a(140),a(2)),o=a(3),l=a(5),m=a(4),u=a(6),v=(a(141),a(73)),f=a(19),h=(a(142),a(127)),d="http://cd4ebab3.ngrok.io",g=a.n(h)()(d),p="Kim Son",E=function(e){function t(){var e;return Object(i.a)(this,t),(e=Object(l.a)(this,Object(m.a)(t).call(this))).onClick=function(e){g.emit("")},e.state={},e}return Object(u.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{id:"login-form"},s.a.createElement("div",{id:"login-form-emoji-zone"},s.a.createElement("div",{id:"emoji"},s.a.createElement("div",{id:"emoji-head"},s.a.createElement("div",{className:"emoji-eye"},s.a.createElement("div",{className:"emoji-pupil"})),s.a.createElement("div",{className:"emoji-eye"},s.a.createElement("div",{className:"emoji-pupil"})),s.a.createElement("div",{id:"emoji-mouth",className:"emoji-mouth"})))),s.a.createElement("input",{id:"login-form-username",className:"login-form-control login-form-text",type:"text",placeholder:"USERNAME"}),s.a.createElement("input",{id:"login-form-password",className:"login-form-control login-form-text",type:"password",placeholder:"PASSWORD"}),s.a.createElement("a",{href:"/chat"},s.a.createElement("button",{className:"login-form-control login-form-button",type:"submit",value:"LOGIN"},"LOGIN")),s.a.createElement("a",{className:"login-form-link",href:"/chat"},"LOST YOUR PASSWORD ?"),s.a.createElement("script",{src:"./animation.js"})))}}]),t}(s.a.Component),b=(a(172),a(173),a(174),a(133)),N=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{className:"message-item"},s.a.createElement("div",{className:"message-item-avatar "+this.props.value.fr},s.a.createElement("div",{className:"avatar-img"},s.a.createElement(b.a,{name:this.props.value.user,size:"50",maxInitials:2,round:!0}))),s.a.createElement("div",{className:"message-item-content "+this.props.value.fr},s.a.createElement("div",{className:"content"},s.a.createElement("span",{className:"chat-user"},this.props.value.user),s.a.createElement("br",null),s.a.createElement("span",{className:"chat-content"},this.props.value.message))),s.a.createElement("div",{className:"message-item-time "+this.props.value.fr},s.a.createElement("div",{className:"created"},this.props.value.DaT))))}}]),t}(s.a.Component),j=a(130),y=a.n(j),O=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(l.a)(this,Object(m.a)(t).call(this,e))).state={DaT:"",receiveMessages:"",userName:p,message:"",avatar:"",messages:[],typing:!1,users_typing:[]},a}return Object(u.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){this.onReceived(),this.receiveHistories(),this.onStopTyping(),this.onTypingFromMember()}},{key:"onReceived",value:function(){var e=this;g.on("receive-message",function(t){var a={user:t.userName,ava:t.avatar,message:t.message,DaT:t.DaT,fr:t.userName===e.state.userName?"fr":""},n=e.state.messages;n.push(a),e.setState({messages:n})})}},{key:"receiveHistories",value:function(){var e=this;g.on("histories-".concat(this.state.userName),function(t){console.log(t);var a=[];t.rows.map(function(t,n){var s=t.username.trim(),r={user:s,avatar:t.username,message:t.message,DaT:t.DaT,fr:s===e.state.userName?"fr":""};a.push(r)}),e.setState({messages:a}),t.userName,e.state.userName})}},{key:"onStopTyping",value:function(){var e=this;g.on("member_stop_typing",function(t){var a=e.state.users_typing,n=a.indexOf(t.userName);-1!==n&&a.splice(n,1);var s=!0;0===a.length&&(s=!1),e.setState({typing:s,users_typing:a})})}},{key:"onTypingFromMember",value:function(){var e=this;g.on("member_typing",function(t){if(t.userName!==e.state.userName){var a=e.state.users_typing;a.includes(t.userName)||a.push(t.userName),e.setState({typing:!0,users_typing:a}),e.setMessage("".concat(t.userName," typing ...."))}})}},{key:"setMessage",value:function(e){var t=this.state.receiveMessages;t=e+"\n"+t,this.setState({receiveMessages:t})}},{key:"render",value:function(){return s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{className:"receive-message-bg"},s.a.createElement(y.a,{className:"message-list-container"},s.a.createElement("div",{className:"message-list"},this.state.messages.map(function(e,t){return s.a.createElement(N,{key:t,value:e})}))),s.a.createElement("div",{className:"typing "+(this.state.typing?"show":"")},s.a.createElement("div",null,this.state.users_typing.join(",")+" typing ..."))))}}]),t}(s.a.Component),k=(a(241),a(242),s.a.Component,function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(l.a)(this,Object(m.a)(t).call(this,e))).onKeyPress=function(e){if("Enter"===e.key){if(""===e.target.value)return;g.emit("send-message",{userName:a.state.userName,message:e.target.value,room:a.state.room}),a.setState({message:"",text:""})}},a.onClick=function(e){},a.onChange=function(e){a.setState({message:e.target.value}),a.setState({changeInput:'<span role="image" aria-label="slightly-smiling-face">&#x1f642</span>'}),g.emit("typing",{userName:a.state.userName,text:e.target.value})},a.state={DaT:"",receiveMessages:"",userName:p,message:"",avatar:"",messages:[],room:0,changeInput:"",text:""},a}return Object(u.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){this.onJoined(),this.onLeaved()}},{key:"onJoined",value:function(){var e=this;g.on("joined",function(t){console.log("Joined: ",t),e.setMessage("User ".concat(t.userName," joined ").concat(t.room)),e.setState({room:t.room})})}},{key:"onLeaved",value:function(){var e=this;g.on("leaved",function(t){console.log("Leaved: ",t),e.setMessage("User ".concat(t.userName," leaved ").concat(t.room))})}},{key:"setMessage",value:function(e){var t=this.state.receiveMessages;t=e+"\n"+t,this.setState({receiveMessages:t})}},{key:"join",value:function(){g.emit("join",{userName:this.state.userName,avatar:this.state.avatar})}},{key:"leave",value:function(){g.emit("leave",{userName:this.state.userName})}},{key:"render",value:function(){return s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{className:"send-message-bg"},s.a.createElement("div",{className:"boder-bg"},s.a.createElement("div",{className:"input-area"},s.a.createElement("div",{className:"send-enter-icon"}),s.a.createElement("input",{placeholder:"Message ".concat(p),onKeyPress:this.onKeyPress,onChange:this.onChange,value:this.state.message}),s.a.createElement("div",{className:"emoji-icon"})))))}}]),t}(s.a.Component)),C=(a(243),a(244),a(72)),S=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(l.a)(this,Object(m.a)(t).call(this,e))).onClick=function(e,t,a){console.log("Clicked",t),g.emit("join",{userName:p,room:t,inRoomName:a})},a.state={room:[],inRoomName:""},a}return Object(u.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this;C.get("".concat(d,"/api/room-list/chanels")).then(function(t){e.setState({room:t.data.data})}).catch(function(e){console.log(e)}).finally(function(){})}},{key:"render",value:function(){var e=this;return s.a.createElement(s.a.Fragment,null,s.a.createElement("ul",{className:"chanellist-bg"},s.a.createElement("li",{className:"title-chanels"},s.a.createElement("i",{class:"fas fa-plus-circle"}),s.a.createElement("div",{className:"title"},"Chanels")),s.a.createElement("li",{className:"list"},s.a.createElement("ul",null,this.state.room.map(function(t,a){return s.a.createElement("li",{key:a,onClick:function(a){return e.onClick(a,t.id,t.name)}},t.name)})))))}}]),t}(s.a.Component),M=(a(261),a(72)),w=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(l.a)(this,Object(m.a)(t).call(this,e))).onClick=function(e,t,a){console.log("Clicked",t),g.emit("join",{userName:p,room:t,inRoomName:a})},a.state={room:[],inRoomName:""},a}return Object(u.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this;M.get("".concat(d,"/api/room-list/messengers")).then(function(t){e.setState({room:t.data.data})}).catch(function(e){console.log(e)}).finally(function(){})}},{key:"render",value:function(){var e=this;return s.a.createElement(s.a.Fragment,null,s.a.createElement("ul",{className:"messengerlist-bg"},s.a.createElement("div",{className:"addb"},"+ Add the chanels"),s.a.createElement("li",{className:"title-chanels"},s.a.createElement("i",{class:"fas fa-plus-circle"}),s.a.createElement("div",{className:"title"},"Direct message")),s.a.createElement("li",{className:"list"},s.a.createElement("ul",null,this.state.room.map(function(t,a){return s.a.createElement("li",{key:a,onClick:function(a){return e.onClick(a,t.id)}},t.name)})))))}}]),t}(s.a.Component),D=(a(262),function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{className:!0},s.a.createElement("input",{type:"text",placeholder:"Search.."})))}}]),t}(s.a.Component)),R=a(72),F=function(e){function t(){var e;return Object(i.a)(this,t),(e=Object(l.a)(this,Object(m.a)(t).call(this))).onClick=function(e,t){console.log("Clicked",t),g.emit("join",{userName:p,room:t})},e.state={rooms:[]},e}return Object(u.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this;R.get("".concat(d,"/api/room-list")).then(function(t){e.setState({rooms:t.data.data})}).catch(function(e){console.log(e)}).finally(function(){}),R.get("".concat(d,"/api/room-list/messengers")).then(function(t){e.setState({rooms:t.data.data})}).catch(function(e){console.log(e)}).finally(function(){})}},{key:"render",value:function(){return s.a.createElement(s.a.Fragment,null,s.a.createElement("div",null,s.a.createElement(D,null)),s.a.createElement("ul",{className:"room-bg"},s.a.createElement("li",null,s.a.createElement(S,null)),s.a.createElement("li",null,s.a.createElement(w,null))),s.a.createElement("div",{class:"scrollbar"},s.a.createElement("div",{class:"force-overflow"})))}}]),t}(s.a.Component),x=(a(263),function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(l.a)(this,Object(m.a)(t).call(this,e))).state={roomName:""},a}return Object(u.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{className:"headchatbox-bg"},s.a.createElement("div",{className:"name-room"},s.a.createElement("div",{className:"input-name"},this.state.roomName))))}}]),t}(s.a.Component)),T=(a(264),function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(l.a)(this,Object(m.a)(t).call(this,e))).state={},a}return Object(u.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{className:"headroomlist-bg"},s.a.createElement("div",{className:"ic-bell"},s.a.createElement("i",{class:"fas fa-bell"})),s.a.createElement("div",{className:"title-room"},"WEB-D002"),s.a.createElement("div",{className:"input-username"},s.a.createElement("div",{className:"status-user"}),s.a.createElement("div",{className:"username"},s.a.createElement("i",{class:"fas fa-circle"}),p))))}}]),t}(s.a.Component)),_=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{className:"chat"},s.a.createElement("div",{className:"roomlist-bg"},s.a.createElement(T,null),s.a.createElement(F,null)),s.a.createElement("div",{className:"chat-box"},s.a.createElement(x,null),s.a.createElement(O,null),s.a.createElement(k,null))))}}]),t}(s.a.Component),L=a(134),I=function(e){function t(e){var a;Object(i.a)(this,t),a=Object(l.a)(this,Object(m.a)(t).call(this,e));var n=new L.a;return a.state={logined:n.get("isLogin")},console.log(a.state),a}return Object(u.a)(t,e),Object(o.a)(t,[{key:"renderRedirect",value:function(){return"true"!==this.state.logined?s.a.createElement(f.a,{to:this.props.orRedirectTo}):this.props.orRender}},{key:"render",value:function(){return s.a.createElement(s.a.Fragment,null,this.renderRedirect())}}]),t}(s.a.Component),J=function(){return s.a.createElement("main",null,s.a.createElement(v.a,null,s.a.createElement(f.d,null,s.a.createElement(f.b,{exact:!0,path:"/",render:function(){return s.a.createElement(I,{orRedirectTo:"/login",orRender:s.a.createElement(_,null)})}}),s.a.createElement(f.b,{path:"/login",component:E}),s.a.createElement(f.b,{path:"/",component:_}))))},P=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return s.a.createElement(s.a.Fragment,null,s.a.createElement("div",null,s.a.createElement(J,null)))}}]),t}(s.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(s.a.createElement(P,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[135,1,2]]]);
//# sourceMappingURL=main.269d6524.chunk.js.map