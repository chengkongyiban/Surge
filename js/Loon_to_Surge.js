/****************************
原脚本作者@小白脸 脚本修改@chengkongyiban
感谢@xream 的指导
说明
   t&zd; = {  , }  花括号中的逗号

***************************/
var name = "";
var desc = "";
let req = $request.url.replace(/plugin.*/,'plugin');
let urlArg = $request.url.replace(/.+plugin(.*)/,'$1');

if (urlArg === ""){
	name = req.match(/.+\/(.+)\.(conf|js|snippet|txt)/)?.[1] || '无名';
    desc = req.match(/.+\/(.+)\.(conf|js|snippet|txt)/)?.[1] || '无名';
}else{
	if(urlArg.match("n=")){
		name = urlArg.split("n=")[1].split("&")[0];
	}else{
		name = req.match(/.+\/(.+)\.(conf|js|snippet|txt)/)?.[1] || '无名';
	}
	if(urlArg.match("d=")){
		desc = urlArg.split("d=")[1].split("&")[0];
	}else{
		desc = name;
	}
};
name = "#!name= " + decodeURIComponent(name);
desc = "#!desc= " + decodeURIComponent(desc);

!(async () => {
  let body = await http(req);

	body = body.match(/[^\n]+/g);
let plugin = [];
let MapLocal = [];
//let MITM = [];

body.forEach((x, y, z) => {
	x = x.replace(/^(#|;|\/\/)/,"#")
	if (x.match(/\x20(_|-)\x20reject-/)){

				z[y - 1]?.match("#") && MapLocal.push(z[y - 1]);
				
				let dict2Mock = x.match('dict') ? '"https://raw.githubusercontent.com/mieqq/mieqq/master/reject-dict.json"' : '';
				
				let array2Mock = x.match('array') ? '"https://raw.githubusercontent.com/mieqq/mieqq/master/reject-array.json"' : '';
				
				let two002Mock = x.match('200') ? '"https://raw.githubusercontent.com/mieqq/mieqq/master/reject-200.txt"' : '';
				
				let img2Mock = x.match('img') ? '"https://raw.githubusercontent.com/mieqq/mieqq/master/reject-img.gif"' : '';
				
				MapLocal.push(x.replace(/(#)?(.+?)\x20-\x20reject-.+/, `$1$2 data=${dict2Mock}${array2Mock}${two002Mock}${img2Mock}`));
		
	}else{if(x.match(/^(DOMAIN|USER-AGENT|URL-REGEX|IP-CIDR|GEOIP|IP-ASN)[^,]*?,[^,]+$/)){
		x.replace(/.+/,"")
		
	}else{
		plugin.push(x)
	}
		
	};
		

	
	
}); //循环结束

plugin = (plugin[0] || '') && `${plugin.join("\n\n")}`;
MapLocal = (MapLocal[0] || '') && `\n\n[Map Local]\n\n${MapLocal.join("\n\n")}`;

body = `${plugin}
${MapLocal}`
		.replace(/\[Rewrite\]/gi,'\n[URL Rewrite]\n')
		.replace(/\[MITM\]/gi,'\n[MITM]\n')
		.replace(/\[Script\]/gi,'\n[Script]\n')
		.replace(/\[Rule\]/gi,'\n[Rule]\n')
		.replace(/\[General\]/gi,'\n[General]\n')
		.replace(/(.+)pattern=(.+\{.*?,.*?\}.*?),(.+)/gi,'$1pattern="$2",$3')
		.replace(/(.+)\x20(302|307)\x20(.+)/gi,"$1 $3 $2")
		.replace(/hostname\x20?=\x20?(.+)/gi,"hostname = %APPEND% $1")
		.replace(/\x20{2,}/gi,' ')
		.replace(/"{2,}/g,'"')
		.replace(/(#.+\n)\n/g,'$1')
		.replace(/\n{2,}/g,'\n\n')
		
		

 $done({ response: { status: 200 ,body:body ,headers: {'Content-Type': 'text/plain; charset=utf-8'} } });

})()
.catch((e) => {
		$notification.post(`${e}`,'','');
		$done()
	})


function http(req) {
  return new Promise((resolve, reject) =>
    $httpClient.get(req, (err, resp,data) => {
  resolve(data)
  })
)
}
