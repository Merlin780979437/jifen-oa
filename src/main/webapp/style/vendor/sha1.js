(function($){var rotateLeft=function(lValue,iShiftBits){return(lValue<<iShiftBits)|(lValue>>>(32-iShiftBits))};var lsbHex=function(value){var string="";var i;var vh;var vl;for(i=0;i<=6;i+=2){vh=(value>>>(i*4+4))&15;vl=(value>>>(i*4))&15;string+=vh.toString(16)+vl.toString(16)}return string};var cvtHex=function(value){var string="";var i;var v;for(i=7;i>=0;i--){v=(value>>>(i*4))&15;string+=v.toString(16)}return string};var uTF8Encode=function(string){string=string.replace(/\x0d\x0a/g,"\x0a");var output="";for(var n=0;n<string.length;n++){var c=string.charCodeAt(n);if(c<128){output+=String.fromCharCode(c)}else{if((c>127)&&(c<2048)){output+=String.fromCharCode((c>>6)|192);output+=String.fromCharCode((c&63)|128)}else{output+=String.fromCharCode((c>>12)|224);output+=String.fromCharCode(((c>>6)&63)|128);output+=String.fromCharCode((c&63)|128)}}}return output};$.extend({sha1:function(string){var blockstart;var i,j;var W=new Array(80);var H0=1732584193;var H1=4023233417;var H2=2562383102;var H3=271733878;var H4=3285377520;var A,B,C,D,E;var tempValue;string=uTF8Encode(string);var stringLength=string.length;var wordArray=new Array();for(i=0;i<stringLength-3;i+=4){j=string.charCodeAt(i)<<24|string.charCodeAt(i+1)<<16|string.charCodeAt(i+2)<<8|string.charCodeAt(i+3);wordArray.push(j)}switch(stringLength%4){case 0:i=2147483648;break;case 1:i=string.charCodeAt(stringLength-1)<<24|8388608;break;case 2:i=string.charCodeAt(stringLength-2)<<24|string.charCodeAt(stringLength-1)<<16|32768;break;case 3:i=string.charCodeAt(stringLength-3)<<24|string.charCodeAt(stringLength-2)<<16|string.charCodeAt(stringLength-1)<<8|128;break}wordArray.push(i);while((wordArray.length%16)!=14){wordArray.push(0)}wordArray.push(stringLength>>>29);wordArray.push((stringLength<<3)&4294967295);for(blockstart=0;blockstart<wordArray.length;blockstart+=16){for(i=0;i<16;i++){W[i]=wordArray[blockstart+i]}for(i=16;i<=79;i++){W[i]=rotateLeft(W[i-3]^W[i-8]^W[i-14]^W[i-16],1)}A=H0;B=H1;C=H2;D=H3;E=H4;for(i=0;i<=19;i++){tempValue=(rotateLeft(A,5)+((B&C)|(~B&D))+E+W[i]+1518500249)&4294967295;E=D;D=C;C=rotateLeft(B,30);B=A;A=tempValue}for(i=20;i<=39;i++){tempValue=(rotateLeft(A,5)+(B^C^D)+E+W[i]+1859775393)&4294967295;E=D;D=C;C=rotateLeft(B,30);B=A;A=tempValue}for(i=40;i<=59;i++){tempValue=(rotateLeft(A,5)+((B&C)|(B&D)|(C&D))+E+W[i]+2400959708)&4294967295;E=D;D=C;C=rotateLeft(B,30);B=A;A=tempValue}for(i=60;i<=79;i++){tempValue=(rotateLeft(A,5)+(B^C^D)+E+W[i]+3395469782)&4294967295;E=D;D=C;C=rotateLeft(B,30);B=A;A=tempValue}H0=(H0+A)&4294967295;H1=(H1+B)&4294967295;H2=(H2+C)&4294967295;H3=(H3+D)&4294967295;H4=(H4+E)&4294967295}var tempValue=cvtHex(H0)+cvtHex(H1)+cvtHex(H2)+cvtHex(H3)+cvtHex(H4);return tempValue.toUpperCase()}})})(jQuery);