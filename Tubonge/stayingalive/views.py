from rest_framework.decorators import (
        api_view,
        schema,
        permission_classes
        )
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status


@api_view(['GET'])
@permission_classes([AllowAny])
def staying_alive(request):
    """
    Health check endpint
    """
    return Response(
            {"message": "I just wanna be alive, I don't wanna die"},
            status=status.HTTP_200_OK
            )
