# LOGAPP

Aplicacion web para administracion de permisos y aplicaciones de ejemplo Ibero

DESCRIPCIÓN
Este módulo es un rol base para crear rápida y fácilmente clientes de servicios web. Cada vez que creaba un cliente de servicio web, notaba que seguía reescribiendo el mismo código repetitivo independientemente del servicio web. Este módulo hace el trabajo estándar aburrido por usted para que pueda concentrarse en la parte divertida: escribir el código específico del servicio web.

MÉTODOS

Estos son los métodos que este rol integra en su clase. Los métodos HTTP (get, post, put y delete) devolverán los datos de respuesta deserializados, si el cuerpo de la respuesta contenía algún dato. Por lo general, será un hashref. Si el servicio web responde con un error, el objeto de respuesta HTTP correspondiente se lanza como una excepción. Esta excepción es un objeto HTTP::Response que tiene la función HTTP::Response::Stringable, por lo que se puede registrar fácilmente. Las solicitudes GET que respondan con un código de estado de 404 o 410 no generarán una excepción. En su lugar, simplemente devolverán undef.

Todos los métodos http get/post/put/delete pueden tomar los siguientes argumentos con nombre opcionales:

encabezados

Un hashref de encabezados personalizados para enviar para esta solicitud. En el futuro, esto también puede aceptar un arrayref. Los valores del encabezado pueden tener cualquier formato que reconozca HTTP::Headers, por lo que puede pasar content_type en lugar de Content-Type.

serializador

Coderef que realiza una serialización personalizada para esta solicitud. Establezca esto en undef si no desea que ocurra ninguna serialización para esta solicitud.

deserializar

Coderef que realiza una deserialización personalizada para esta solicitud. Establézcalo en undef si desea que se devuelva el cuerpo de respuesta HTTP sin procesar.
