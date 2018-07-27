<#if fileType=="TXT" || fileType=="CSV">
	<#assign seperator = ",">
  <#if fileType=="TXT">
		<#assign seperator = " ">
  </#if>
	<#list contacts as contact>
		${contact.name}${seperator}${contact.mobile}${seperator}${contact.email}
	</#list>
<#elseif fileType=="VCARD">
	<#list contacts as contact>
		BEGIN:vcard
		VERSION:2.1
		FN:${contact.name}
		TEL;${contact.mobile}
		EMAIL;${contact.email}
    	N:ENCODING=QUOTED-PRINTABLE;CHARSET=UTF-8:CC=8B?AF=95100
		END:vcard
	</#list>
</#if>