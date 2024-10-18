from django.urls import path, include

# from supertokens_python import get_all_urls
# from supertokens_python.recipe import emailpassword, session
# from supertokens_python.recipe.emailpassword.interfaces import (
#         APIInterface
#         )

from users.views import (
        UserDetailView,
        )


urlpatterns = [
        path(
            'user/profile/',
            UserDetailView.as_view(),
            name='user-detail'
            ),
        # path(
        #     'user/profile/learner/',
        #     CreateLearnerProfileView.as_view(),
        #     name='learner-profile'
        #     ),
        # path(
        #     'user/profile/tutor/',
        #     CreateTutorProfileView.as_view(),
        #     name='tutor-profile'
        #     ),
        ]
