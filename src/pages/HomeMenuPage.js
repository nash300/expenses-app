import React from "react";
import createIcon from '../utilities/icons/1 (77).png'
import editIcon from '../utilities/icons/1 (81).png'
import statisticsIcon from '../utilities/icons/1 (84).png'
import exitIcon from '../utilities/icons/1 (146).png'

function HomeMenuPage() {
  return <><div class="row row-cols-1 row-cols-md-2 g-4">
  <div class="col">
    <div class="card">
      <img src={createIcon} class="card-img-top" alt="..." style = {{width : '100px'}} />
      <div class="card-body">
        <h5 class="card-title">Create New</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card">
      <img src={editIcon} class="card-img-top" alt="..." style = {{width : '100px'}}/>
      <div class="card-body">
        <h5 class="card-title">Edit</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card">
      <img src={statisticsIcon} class="card-img-top" alt="..." style = {{width : '100px'}}/>
      <div class="card-body">
        <h5 class="card-title">Statistics</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card">
      <img src={exitIcon} class="card-img-top" alt="..." style = {{width : '100px'}}/>
      <div class="card-body">
        <h5 class="card-title">Exit</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
  </div>
</div></>;
}

export default HomeMenuPage;
