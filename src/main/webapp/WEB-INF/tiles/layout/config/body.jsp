
<%@ include file="/WEB-INF/tiles/taglibs.jsp"%>

<body>
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <div ui-view>
    
                </div>
            </div>
        </div>
    </div>

    <tiles:insertAttribute name="footer-content" />
</body>
