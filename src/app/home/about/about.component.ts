import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  fullNav = true;
  whatIsUdicti = 'UDICTI is a unit within CoICT that promotes and nurtures innovations and entrepreneurship.' +
    ' It was established as an incubator in 2010 to address the growing unemployment rate among ' +
    'graduates despite their ability to develop solutions that can be commercialized. It’s flagship pre-' +
    'incubation program grooms students as they turn their ideas into businesses, and nurtures them' +
    'until they are able to stand on their own. Since its establishment as an incubator, UDICTI has ' +
    'grown into an innovation centre offering training,research and consultancies on innovation and ' +
    'entrepreneurship.';

  whyUdicti = ['Many University students have great solutions and wish to employ themselves btu need some support to get started.',
    'There is a great demand for ICT-related solutions to problems in the society and companies continue to import solutions.',
    'There are fewer opportunities for graduates employments nowdays.'];

  manualService = ['Training (Technical and Business related)', 'Office space and facilities (computing facilities,connectivity' +
  ' and a stand-by generator)',
    'Coaching and mentoring.', 'Networking opportunities.', '5.Support.'];

  manualAbout = [{
    heading: 'VISION',
    details: 'To be the leading centre that empowers Youth to realize their dreams leading to social economic development.',
    image: '../../assets/img/about/vission.jpg'
  }, {
    heading: 'MISSION ',
    details: 'To nurture Youth’s innovative ideas through hands-on skills training and coaching.',
    image: '../../assets/img/about/mission.jpg'
  }, {
    heading: 'CORE VALUES',
    details: 'Commitment,Creativity,Credibility.',
    image: '../../assets/img/about/core_value.jpg'
  }];
  constructor() { }

  ngOnInit() {
  }

}
