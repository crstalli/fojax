
<%@ include file="/WEB-INF/tiles/taglibs.jsp"%>

<body>
    <div class="container">
        <div class="row">

            <div ui-view>

            </div>
        </div>
    </div>

    <tiles:insertAttribute name="footer-content" />
</body>
