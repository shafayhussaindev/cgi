// SectionHeader shows the small eyebrow label, a heading and an optional intro text.
//
// Props:
//   eyebrow  - small uppercase label above the title
//   title    - the heading text
//   intro    - optional paragraph under the heading
//   isPageTitle - true to use a big <h1> (one per page); otherwise an <h2>
//   onBlue   - true when the section background is blue (makes the text white)

function SectionHeader(props) {
  let className = "section-header";
  if (props.onBlue) {
    className = "section-header section-header-on-blue";
  }

  return (
    <div className={className}>
      {props.eyebrow && <span className="eyebrow">{props.eyebrow}</span>}

      {/* Pages get one big h1; sections inside a page use h2 */}
      {props.isPageTitle ? (
        <h1 className="section-header-title section-header-page-title">{props.title}</h1>
      ) : (
        <h2 className="section-header-title">{props.title}</h2>
      )}

      {props.intro && <p className="section-header-intro">{props.intro}</p>}
    </div>
  );
}

export default SectionHeader;
