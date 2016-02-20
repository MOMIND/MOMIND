export default class Link extends React.Component {

   static propTypes = {
      from: React.PropTypes.object,
      to: React.PropTypes.object,
      type:React.PropTypes.string,
   };
   constructor(props) {
      super(props);
   }
   state = {
         beginx: 0,
         beginy: 0,
         endx: 0,
         endy: 0,
         active: false,
   };

   render() {
      return (
         <svg><line></line></svg>
         );
   }
}

/*<div 
style='padding:0px; 
margin:0px; 
height:" + thickness + "px; 
background-color:" + color + "; 
line-height:1px; 
position:absolute; 
left:" + cx + "px; 
top:" + cy + "px; 
width:" + length + "px; 
-moz-transform:rotate(" + angle + "deg); 
-webkit-transform:rotate(" + angle + "deg); 
-o-transform:rotate(" + angle + "deg); 
-ms-transform:rotate(" + angle + "deg); 
transform:rotate(" + angle + "deg);' />

line1.attr('x1',pos1.left)
.attr('y1',pos1.top)
.attr('x2',pos2.left)
.attr('y2',pos2.top);


*/
