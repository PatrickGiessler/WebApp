/*!
 * VERSION: 0.8.10
 * DATE: 2017-04-29
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2017, GreenSock. All rights reserved.
 * MorphSVGPlugin is a Club GreenSock membership benefit; You must have a valid membership to use
 * this code without violating the terms of use. Visit http://greensock.com/club/ to sign up or get more details.
 * This work is subject to the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window;(_gsScope._gsQueue||(_gsScope._gsQueue=[])).push(function(){"use strict";var Q=Math.PI/180,E=180/Math.PI,M=/[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,w=/(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,a=/(^[#\.]|[a-y][a-z])/gi,u=/[achlmqstvz]/gi,y=/[\+\-]?\d*\.?\d+e[\+\-]?\d+/gi,c=_gsScope._gsDefine.globals.TweenLite,p="MorphSVGPlugin",d=String.fromCharCode(103,114,101,101,110,115,111,99,107,46,99,111,109),m=String.fromCharCode(47,114,101,113,117,105,114,101,115,45,109,101,109,98,101,114,115,104,105,112,47),C=function(e){for(var t=-1!==(window?window.location.href:"").indexOf(String.fromCharCode(103,114,101,101,110,115,111,99,107))&&-1!==e.indexOf(String.fromCharCode(108,111,99,97,108,104,111,115,116)),r=[d,String.fromCharCode(99,111,100,101,112,101,110,46,105,111),String.fromCharCode(99,111,100,101,112,101,110,46,112,108,117,109,98,105,110,103),String.fromCharCode(99,111,100,101,112,101,110,46,100,101,118),String.fromCharCode(99,115,115,45,116,114,105,99,107,115,46,99,111,109),String.fromCharCode(99,100,112,110,46,105,111),String.fromCharCode(103,97,110,110,111,110,46,116,118),String.fromCharCode(99,111,100,101,99,97,110,121,111,110,46,110,101,116),String.fromCharCode(116,104,101,109,101,102,111,114,101,115,116,46,110,101,116),String.fromCharCode(99,101,114,101,98,114,97,120,46,99,111,46,117,107),String.fromCharCode(116,121,109,112,97,110,117,115,46,110,101,116),String.fromCharCode(116,119,101,101,110,109,97,120,46,99,111,109),String.fromCharCode(116,119,101,101,110,108,105,116,101,46,99,111,109),String.fromCharCode(112,108,110,107,114,46,99,111),String.fromCharCode(104,111,116,106,97,114,46,99,111,109),String.fromCharCode(119,101,98,112,97,99,107,98,105,110,46,99,111,109),String.fromCharCode(97,114,99,104,105,118,101,46,111,114,103),String.fromCharCode(99,111,100,101,115,97,110,100,98,111,120,46,105,111),String.fromCharCode(115,116,97,99,107,98,108,105,116,122,46,99,111,109),String.fromCharCode(99,111,100,105,101,114,46,105,111),String.fromCharCode(106,115,102,105,100,100,108,101,46,110,101,116)],n=r.length;-1<--n;)if(-1!==e.indexOf(r[n]))return!0;return t&&window&&window.console&&console.log(String.fromCharCode(87,65,82,78,73,78,71,58,32,97,32,115,112,101,99,105,97,108,32,118,101,114,115,105,111,110,32,111,102,32)+p+String.fromCharCode(32,105,115,32,114,117,110,110,105,110,103,32,108,111,99,97,108,108,121,44,32,98,117,116,32,105,116,32,119,105,108,108,32,110,111,116,32,119,111,114,107,32,111,110,32,97,32,108,105,118,101,32,100,111,109,97,105,110,32,98,101,99,97,117,115,101,32,105,116,32,105,115,32,97,32,109,101,109,98,101,114,115,104,105,112,32,98,101,110,101,102,105,116,32,111,102,32,67,108,117,98,32,71,114,101,101,110,83,111,99,107,46,32,80,108,101,97,115,101,32,115,105,103,110,32,117,112,32,97,116,32,104,116,116,112,58,47,47,103,114,101,101,110,115,111,99,107,46,99,111,109,47,99,108,117,98,47,32,97,110,100,32,116,104,101,110,32,100,111,119,110,108,111,97,100,32,116,104,101,32,39,114,101,97,108,39,32,118,101,114,115,105,111,110,32,102,114,111,109,32,121,111,117,114,32,71,114,101,101,110,83,111,99,107,32,97,99,99,111,117,110,116,32,119,104,105,99,104,32,104,97,115,32,110,111,32,115,117,99,104,32,108,105,109,105,116,97,116,105,111,110,115,46,32,84,104,101,32,102,105,108,101,32,121,111,117,39,114,101,32,117,115,105,110,103,32,119,97,115,32,108,105,107,101,108,121,32,100,111,119,110,108,111,97,100,101,100,32,102,114,111,109,32,101,108,115,101,119,104,101,114,101,32,111,110,32,116,104,101,32,119,101,98,32,97,110,100,32,105,115,32,114,101,115,116,114,105,99,116,101,100,32,116,111,32,108,111,99,97,108,32,117,115,101,32,111,114,32,111,110,32,115,105,116,101,115,32,108,105,107,101,32,99,111,100,101,112,101,110,46,105,111,46)),t}(window?window.location.host:""),A=function(e){_gsScope.console&&console.log(e)},x=function(e,t,r,n,o,i,a,s,h){if(e!==s||t!==h){r=Math.abs(r),n=Math.abs(n);var l=o%360*Q,f=Math.cos(l),g=Math.sin(l),u=(e-s)/2,c=(t-h)/2,p=f*u+g*c,d=-g*u+f*c,m=r*r,C=n*n,v=p*p,b=d*d,S=v/m+b/C;1<S&&(m=(r=Math.sqrt(S)*r)*r,C=(n=Math.sqrt(S)*n)*n);var M=i===a?-1:1,y=(m*C-m*b-C*v)/(m*b+C*v);y<0&&(y=0);var A=M*Math.sqrt(y),x=A*(r*d/n),w=A*(-n*p/r),N=(e+s)/2+(f*x-g*w),_=(t+h)/2+(g*x+f*w),z=(p-x)/r,P=(d-w)/n,T=(-p-x)/r,L=(-d-w)/n,G=Math.sqrt(z*z+P*P),q=z,I=(M=P<0?-1:1)*Math.acos(q/G)*E;G=Math.sqrt((z*z+P*P)*(T*T+L*L)),q=z*T+P*L;var Y=(M=z*L-P*T<0?-1:1)*Math.acos(q/G)*E;!a&&0<Y?Y-=360:a&&Y<0&&(Y+=360);var B,V,X,O=function(e,t){var r,n,o,i,a,s,h=Math.ceil(Math.abs(t)/90),l=0,f=[];for(e*=Q,r=(t*=Q)/h,n=4/3*Math.sin(r/2)/(1+Math.cos(r/2)),s=0;s<h;s++)o=e+s*r,i=Math.cos(o),a=Math.sin(o),f[l++]=i-n*a,f[l++]=a+n*i,o+=r,i=Math.cos(o),a=Math.sin(o),f[l++]=i+n*a,f[l++]=a-n*i,f[l++]=i,f[l++]=a;return f}(I%=360,Y%=360),R=f*r,j=g*r,F=g*-n,H=f*n,D=O.length-2;for(B=0;B<D;B+=2)V=O[B],X=O[B+1],O[B]=V*R+X*F+N,O[B+1]=V*j+X*H+_;return O[O.length-2]=s,O[O.length-1]=h,O}},v=function(e){var t,r,n,o,i,a,s,h,l,f,g,u,c,p=(e+"").replace(y,function(e){var t=+e;return t<1e-4&&-1e-4<t?0:t}).match(M)||[],d=[],m=0,C=0,v=p.length,b=2,S=0;if(!e||!isNaN(p[0])||isNaN(p[1]))return A("ERROR: malformed path data: "+e),d;for(t=0;t<v;t++)if(c=i,isNaN(p[t])?a=(i=p[t].toUpperCase())!==p[t]:t--,n=+p[t+1],o=+p[t+2],a&&(n+=m,o+=C),0===t&&(h=n,l=o),"M"===i)s&&s.length<8&&(d.length-=1,b=0),m=h=n,C=l=o,s=[n,o],S+=b,b=2,d.push(s),t+=2,i="L";else if("C"===i)s||(s=[0,0]),s[b++]=n,s[b++]=o,a||(m=C=0),s[b++]=m+1*p[t+3],s[b++]=C+1*p[t+4],s[b++]=m+=1*p[t+5],s[b++]=C+=1*p[t+6],t+=6;else if("S"===i)"C"===c||"S"===c?(f=m-s[b-4],g=C-s[b-3],s[b++]=m+f,s[b++]=C+g):(s[b++]=m,s[b++]=C),s[b++]=n,s[b++]=o,a||(m=C=0),s[b++]=m+=1*p[t+3],s[b++]=C+=1*p[t+4],t+=4;else if("Q"===i)f=n-m,g=o-C,s[b++]=m+2*f/3,s[b++]=C+2*g/3,a||(m=C=0),f=n-(m+=1*p[t+3]),g=o-(C+=1*p[t+4]),s[b++]=m+2*f/3,s[b++]=C+2*g/3,s[b++]=m,s[b++]=C,t+=4;else if("T"===i)f=m-s[b-4],g=C-s[b-3],s[b++]=m+f,s[b++]=C+g,f=m+1.5*f-n,g=C+1.5*g-o,s[b++]=n+2*f/3,s[b++]=o+2*g/3,s[b++]=m=n,s[b++]=C=o,t+=2;else if("H"===i)o=C,s[b++]=m+(n-m)/3,s[b++]=C+(o-C)/3,s[b++]=m+2*(n-m)/3,s[b++]=C+2*(o-C)/3,s[b++]=m=n,s[b++]=o,t+=1;else if("V"===i)o=n,n=m,a&&(o+=C-m),s[b++]=n,s[b++]=C+(o-C)/3,s[b++]=n,s[b++]=C+2*(o-C)/3,s[b++]=n,s[b++]=C=o,t+=1;else if("L"===i||"Z"===i)"Z"===i&&(n=h,o=l,s.closed=!0),("L"===i||.5<Math.abs(m-n)||.5<Math.abs(C-o))&&(s[b++]=m+(n-m)/3,s[b++]=C+(o-C)/3,s[b++]=m+2*(n-m)/3,s[b++]=C+2*(o-C)/3,s[b++]=n,s[b++]=o,"L"===i&&(t+=2)),m=n,C=o;else if("A"===i){if(u=x(m,C,1*p[t+1],1*p[t+2],1*p[t+3],1*p[t+4],1*p[t+5],(a?m:0)+1*p[t+6],(a?C:0)+1*p[t+7]))for(r=0;r<u.length;r++)s[b++]=u[r];m=s[b-2],C=s[b-1],t+=7}else A("Error: malformed path data: "+e);return d.totalPoints=S+b,d},N=function(e,t){var r,n,o,i,a,s,h,l,f,g,u,c,p,d,m=0,C=e.length,v=t/((C-2)/6);for(p=2;p<C;p+=6)for(m+=v;.999999<m;)r=e[p-2],n=e[p-1],o=e[p],i=e[p+1],a=e[p+2],s=e[p+3],h=e[p+4],l=e[p+5],f=r+(o-r)*(d=1/(Math.floor(m)+1)),f+=((u=o+(a-o)*d)-f)*d,u+=(a+(h-a)*d-u)*d,g=n+(i-n)*d,g+=((c=i+(s-i)*d)-g)*d,c+=(s+(l-s)*d-c)*d,e.splice(p,4,r+(o-r)*d,n+(i-n)*d,f,g,f+(u-f)*d,g+(c-g)*d,u,c,a+(h-a)*d,s+(l-s)*d),p+=6,C+=6,m--;return e},s=function(e){var t,r,n,o,i="",a=e.length,s=100;for(r=0;r<a;r++){for(i+="M"+(o=e[r])[0]+","+o[1]+" C",t=o.length,n=2;n<t;n++)i+=(o[n++]*s|0)/s+","+(o[n++]*s|0)/s+" "+(o[n++]*s|0)/s+","+(o[n++]*s|0)/s+" "+(o[n++]*s|0)/s+","+(o[n]*s|0)/s+" ";o.closed&&(i+="z")}return i},_=function(e){for(var t=[],r=e.length-1,n=0;-1<--r;)t[n++]=e[r],t[n++]=e[r+1],r--;for(r=0;r<n;r++)e[r]=t[r];e.reversed=!e.reversed},b=function(e){var t,r=e.length,n=0,o=0;for(t=0;t<r;t++)n+=e[t++],o+=e[t];return[n/(r/2),o/(r/2)]},z=function(e){var t,r,n,o=e.length,i=e[0],a=i,s=e[1],h=s;for(n=6;n<o;n+=6)i<(t=e[n])?i=t:t<a&&(a=t),s<(r=e[n+1])?s=r:r<h&&(h=r);return e.centerX=(i+a)/2,e.centerY=(s+h)/2,e.size=(i-a)*(s-h)},P=function(e){for(var t,r,n,o,i,a=e.length,s=e[0][0],h=s,l=e[0][1],f=l;-1<--a;)for(t=(i=e[a]).length,o=6;o<t;o+=6)s<(r=i[o])?s=r:r<h&&(h=r),l<(n=i[o+1])?l=n:n<f&&(f=n);return e.centerX=(s+h)/2,e.centerY=(l+f)/2,e.size=(s-h)*(l-f)},T=function(e,t){return t.length-e.length},L=function(e,t){var r=e.size||z(e),n=t.size||z(t);return Math.abs(n-r)<(r+n)/20?t.centerX-e.centerX||t.centerY-e.centerY:n-r},G=function(e,t){var r,n,o=e.slice(0),i=e.length,a=i-2;for(t|=0,r=0;r<i;r++)n=(r+t)%a,e[r++]=o[n],e[r]=o[n+1]},S=function(e,t,r,n,o){var i,a,s,h,l=e.length,f=0,g=l-2;for(r*=6,a=0;a<l;a+=6)h=e[i=(a+r)%g]-(t[a]-n),s=e[i+1]-(t[a+1]-o),f+=Math.sqrt(s*s+h*h);return f},q=function(e,t,r){var n,o,i,a=e.length,s=b(e),h=b(t),l=h[0]-s[0],f=h[1]-s[1],g=S(e,t,0,l,f),u=0;for(i=6;i<a;i+=6)(o=S(e,t,i/6,l,f))<g&&(g=o,u=i);if(r)for(n=e.slice(0),_(n),i=6;i<a;i+=6)(o=S(n,t,i/6,l,f))<g&&(g=o,u=-i);return u/6},I=function(e,t,r){for(var n,o,i,a,s,h,l=e.length,f=99999999999,g=0,u=0;-1<--l;)for(h=(n=e[l]).length,s=0;s<h;s+=6)o=n[s]-t,i=n[s+1]-r,(a=Math.sqrt(o*o+i*i))<f&&(f=a,g=n[s],u=n[s+1]);return[g,u]},Y=function(e,t,r,n,o,i){var a,s,h,l,f=t.length,g=0,u=Math.min(e.size||z(e),t[r].size||z(t[r]))*n,c=999999999999,p=e.centerX+o,d=e.centerY+i;for(a=r;a<f&&!((t[a].size||z(t[a]))<u);a++)s=t[a].centerX-p,h=t[a].centerY-d,(l=Math.sqrt(s*s+h*h))<c&&(g=a,c=l);return l=t[g],t.splice(g,1),l},h=function(e,t,r,n){var o,i,a,s,h,l,f,g=t.length-e.length,u=0<g?t:e,c=0<g?e:t,p=0,d="complexity"===n?T:L,m="position"===n?0:"number"==typeof n?n:.8,C=c.length,v="object"==typeof r&&r.push?r.slice(0):[r],b="reverse"===v[0]||v[0]<0,S="log"===r;if(c[0]){if(1<u.length&&(e.sort(d),t.sort(d),u.size||P(u),c.size||P(c),l=u.centerX-c.centerX,f=u.centerY-c.centerY,d===L))for(C=0;C<c.length;C++)u.splice(C,0,Y(c[C],u,C,m,l,f));if(g)for(g<0&&(g=-g),u[0].length>c[0].length&&N(c[0],(u[0].length-c[0].length)/6|0),C=c.length;p<g;)u[C].size||z(u[C]),s=(a=I(c,u[C].centerX,u[C].centerY))[0],h=a[1],c[C++]=[s,h,s,h,s,h,s,h],c.totalPoints+=8,p++;for(C=0;C<e.length;C++)o=t[C],i=e[C],(g=o.length-i.length)<0?N(o,-g/6|0):0<g&&N(i,g/6|0),b&&!i.reversed&&_(i),(r=v[C]||0===v[C]?v[C]:"auto")&&(i.closed||Math.abs(i[0]-i[i.length-2])<.5&&Math.abs(i[1]-i[i.length-1])<.5?"auto"===r||"log"===r?(v[C]=r=q(i,o,0===C),r<0&&(b=!0,_(i),r=-r),G(i,6*r)):"reverse"!==r&&(C&&r<0&&_(i),G(i,6*(r<0?-r:r))):!b&&("auto"===r&&Math.abs(o[0]-i[0])+Math.abs(o[1]-i[1])+Math.abs(o[o.length-2]-i[i.length-2])+Math.abs(o[o.length-1]-i[i.length-1])>Math.abs(o[0]-i[i.length-2])+Math.abs(o[1]-i[i.length-1])+Math.abs(o[o.length-2]-i[0])+Math.abs(o[o.length-1]-i[1])||r%2)?(_(i),v[C]=-1,b=!0):"auto"===r?v[C]=0:"reverse"===r&&(v[C]=-1),i.closed!==o.closed&&(i.closed=o.closed=!1));return S&&A("shapeIndex:["+v.join(",")+"]"),v}},B=function(e,t,r,n){var o=v(e[0]),i=v(e[1]);h(o,i,t||0===t?t:"auto",r)&&(e[0]=s(o),e[1]=s(i),"log"!==n&&!0!==n||A('precompile:["'+e[0]+'","'+e[1]+'"]'))},o=function(e,t){var r,n,o,i,a,s,h,l=0,f=parseFloat(e[0]),g=parseFloat(e[1]),u=f+","+g+" ";for(r=.5*t/(.5*(o=e.length)-1),n=0;n<o-2;n+=2){if(l+=r,s=parseFloat(e[n+2]),h=parseFloat(e[n+3]),.999999<l)for(a=1/(Math.floor(l)+1),i=1;.999999<l;)u+=(f+(s-f)*a*i).toFixed(2)+","+(g+(h-g)*a*i).toFixed(2)+" ",l--,i++;u+=s+","+h+" ",f=s,g=h}return u},r=function(e){var t=e[0].match(w)||[],r=e[1].match(w)||[],n=r.length-t.length;0<n?e[0]=o(t,n):e[1]=o(r,-n)},V=function(t){return isNaN(t)?r:function(e){r(e),e[1]=function(e,t){if(!t)return e;var r,n,o,i=e.match(w)||[],a=i.length,s="";for("reverse"===t?(n=a-1,r=-2):(n=(2*(parseInt(t,10)||0)+1+100*a)%a,r=2),o=0;o<a;o+=2)s+=i[n-1]+","+i[n]+" ",n=(n+r)%a;return s}(e[1],parseInt(t,10))}},l=function(e,t){var r,n,o,i,a,s,h,l,f,g,u,c,p,d,m,C,v,b,S,M,y,A=e.tagName.toLowerCase(),x=.552284749831;return"path"!==A&&e.getBBox?(s=function(e,t){var r,n=_gsScope.document.createElementNS("http://www.w3.org/2000/svg","path"),o=Array.prototype.slice.call(e.attributes),i=o.length;for(t=","+t+",";-1<--i;)r=o[i].nodeName.toLowerCase(),-1===t.indexOf(","+r+",")&&n.setAttributeNS(null,r,o[i].nodeValue);return n}(e,"x,y,width,height,cx,cy,rx,ry,r,x1,x2,y1,y2,points"),"rect"===A?(i=+e.getAttribute("rx")||0,a=+e.getAttribute("ry")||0,n=+e.getAttribute("x")||0,o=+e.getAttribute("y")||0,g=(+e.getAttribute("width")||0)-2*i,u=(+e.getAttribute("height")||0)-2*a,r=i||a?"M"+(C=(d=(p=n+i)+g)+i)+","+(b=o+a)+" V"+(S=b+u)+" C"+[C,M=S+a*x,m=d+i*x,y=S+a,d,y,d-(d-p)/3,y,p+(d-p)/3,y,p,y,c=n+i*(1-x),y,n,M,n,S,n,S-(S-b)/3,n,b+(S-b)/3,n,b,n,v=o+a*(1-x),c,o,p,o,p+(d-p)/3,o,d-(d-p)/3,o,d,o,m,o,C,v,C,b].join(",")+"z":"M"+(n+g)+","+o+" v"+u+" h"+-g+" v"+-u+" h"+g+"z"):"circle"===A||"ellipse"===A?("circle"===A?l=(i=a=+e.getAttribute("r")||0)*x:(i=+e.getAttribute("rx")||0,l=(a=+e.getAttribute("ry")||0)*x),r="M"+((n=+e.getAttribute("cx")||0)+i)+","+(o=+e.getAttribute("cy")||0)+" C"+[n+i,o+l,n+(h=i*x),o+a,n,o+a,n-h,o+a,n-i,o+l,n-i,o,n-i,o-l,n-h,o-a,n,o-a,n+h,o-a,n+i,o-l,n+i,o].join(",")+"z"):"line"===A?r="M"+(e.getAttribute("x1")||0)+","+(e.getAttribute("y1")||0)+" L"+(e.getAttribute("x2")||0)+","+(e.getAttribute("y2")||0):"polyline"!==A&&"polygon"!==A||(r="M"+(n=(f=(e.getAttribute("points")+"").match(w)||[]).shift())+","+(o=f.shift())+" L"+f.join(","),"polygon"===A&&(r+=","+n+","+o+"z")),s.setAttribute("d",r),t&&e.parentNode&&(e.parentNode.insertBefore(s,e),e.parentNode.removeChild(e)),s):e},X=function(e,t,r){var n,o,i="string"==typeof e;return(!i||a.test(e)||(e.match(w)||[]).length<3)&&((n=i?c.selector(e):e&&e[0]?e:[e])&&n[0]?(o=(n=n[0]).nodeName.toUpperCase(),t&&"PATH"!==o&&(n=l(n,!1),o="PATH"),e=n.getAttribute("PATH"===o?"d":"points")||"",n===r&&(e=n.getAttributeNS(null,"data-original")||e)):(A("WARNING: invalid morph to: "+e),e=!1)),e},O="Use MorphSVGPlugin.convertToPath(elementOrSelectorText) to convert to a path before morphing.",R=_gsScope._gsDefine.plugin({propName:"morphSVG",API:2,global:!0,version:"0.8.10",init:function(e,t,r,n){var o,i,a,s,h,l,f,g;return"function"==typeof e.setAttribute&&(C?("function"==typeof t&&(t=t(n,e)),h="POLYLINE"===(o=e.nodeName.toUpperCase())||"POLYGON"===o,"PATH"===o||h?(i="PATH"===o?"d":"points",("string"==typeof t||t.getBBox||t[0])&&(t={shape:t}),s=X(t.shape||t.d||t.points||"","d"===i,e),h&&u.test(s)?(A("WARNING: a <"+o+"> cannot accept path data. "+O),!1):(s&&((this._target=e).getAttributeNS(null,"data-original")||e.setAttributeNS(null,"data-original",e.getAttribute(i)),(a=this._addTween(e,"setAttribute",e.getAttribute(i)+"",s+"","morphSVG",!1,i,"object"==typeof t.precompile?function(e){e[0]=t.precompile[0],e[1]=t.precompile[1]}:"d"===i?(l=t.shapeIndex,f=t.map||R.defaultMap,g=t.precompile,f||g||l||0===l?function(e){B(e,l,f,g)}:B):V(t.shapeIndex)))&&(this._overwriteProps.push("morphSVG"),a.end=s,a.endProp=i)),C)):(A("WARNING: cannot morph a <"+o+"> SVG element. "+O),!1)) set:function(e){var t;if(this._super.setRatio.call(this,e),1===e)for(t=this._firstPT;t;)t.end&&this._target.setAttribute(t.endProp,t.end),t=t._next}});R.pathFilter=B,R.pointsFilter=r,R.subdivideRawBezier=N,R.defaultMap="size",R.pathDataToRawBezier=function(e){return v(X(e,!0))},R.equalizeSegmentQuantity=h,R.convertToPath=function(e,t){"string"==typeof e&&(e=c.selector(e));for(var r=e&&0!==e.length?e.length&&e[0]&&e[0].nodeType?Array.prototype.slice.call(e,0):[e]:[],n=r.length;-1<--n;)r[n]=l(r[n],!1!==t);return r},R.pathDataToBezier=function(e,t){var r,n,o,i,a,s,h,l,f=v(X(e,!0))[0]||[],g=0;if(l=(t=t||{}).align||t.relative,i=t.matrix||[1,0,0,1,0,0],a=t.offsetX||0,s=t.offsetY||0,"relative"===l||!0===l?(a-=f[0]*i[0]+f[1]*i[2],s-=f[0]*i[1]+f[1]*i[3],g="+="):(a+=i[4],s+=i[5],l&&(l="string"==typeof l?c.selector(l):l&&l[0]?l:[l])&&l[0]&&(a-=(h=l[0].getBBox()||{x:0,y:0}).x,s-=h.y)),r=[],o=f.length,i&&"1,0,0,1,0,0"!==i.join(","))for(n=0;n<o;n+=2)r.push({x:g+(f[n]*i[0]+f[n+1]*i[2]+a),y:g+(f[n]*i[1]+f[n+1]*i[3]+s)});else for(n=0;n<o;n+=2)r.push({x:g+(f[n]+a),y:g+(f[n+1]+s)});return r}}),_gsScope._gsDefine&&_gsScope._gsQueue.pop()(),function(e){"use strict";var t=function(){return(_gsScope.GreenSockGlobals||_gsScope).MorphSVGPlugin};"function"==typeof define&&define.amd?define(["TweenLite"],t):"undefined"!=typeof module&&module.exports&&(require("../TweenLite.js"),module.exports=t())}();