   <%@ include file="/WEB-INF/tiles/taglibs.jsp"  %>
   <!-- Main jumbotron for a primary marketing message or call to action -->
  <body>
<div class="row">
  <div class="col-lg-8">
    <div class="input-group">
      <div class="input-group-btn">
        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Action <span class="caret"></span></button>
        <ul class="dropdown-menu">
          <li><a href="#">Like this</a></li>
          <li><a href="#">No, like this</a></li>
          <li><a href="#">Oh wait this too</a></li>
        </ul>
      </div><!-- /btn-group -->
      <input type="text" class="form-control" aria-label="...">
    </div>
  </div>
</div>
 <div class="btn-group" dropdown is-open="status.isopen">
      <button type="button" class="btn btn-primary dropdown-toggle" dropdown-toggle ng-disabled="disabled">
        Cool dropdown, bro <span class="caret"></span>
      </button>
      <ul class="dropdown-menu" role="menu">
        <li><a href="#">Something here</a></li>
        <li><a href="#">More something here</a></li>
        <li><a href="#">Something cool here</a></li>
      </ul>
    </div>
       <tiles:insertAttribute name="footer-content"/>
  </body>
		