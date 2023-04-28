use std::borrow::Cow;
use std::rc::Rc;

use image::GenericImageView;
use yew::prelude::*;
use yew::virtual_dom::VNode;
use yew::{html, Html};

use next::Image;
use react::{ReactNode, FunctionComponent};
use heroicons::{solid::HeartIcon, solid::ArrowUpRightIcon};
use std::collections::HashMap;

mod capitalized_title;
use capitalized_title::CapitalizedTitle;

struct Link {
    href: String,
    text: Html,
}

struct LinkSubsection {
    title: String,
    links: Vec<Link>,
}

impl Component for LinkSubsection {
    type Message = ();
    type Properties = LinkSubsectionProps;

    fn create(props: Self::Properties, _link: ComponentLink<Self>) -> Self {
        Self { title: props.title, links: props.links }
    }

    fn update(&mut self, _msg: Self::Message) -> ShouldRender {
        false
    }

    fn change(&mut self, props: Self::Properties) -> ShouldRender {
        self.title = props.title;
        self.links = props.links;
        true
    }

    fn view(&self) -> Html {
        html! {
            <div class="w-1/3">
                <h3 class="text-xl">{ &self.title }</h3>
                <div class="mt-8 flex flex-col">
                    { for self.links.iter().map(|link| self.render_link(link)) }
                </div>
            </div>
        }
    }
}

impl LinkSubsection {
    fn render_link(&self, link: &Link) -> Html {
        html! {
            <a
                key=&link.href
                class="mb-5 w-fit text-sm transition duration-500 hover:text-clementine"
                href=&link.href
            >
                { &link.text }
            </a>
        }
    }
}

#[derive(Properties, Clone)]
struct LinkSubsectionProps {
    title: String,
    links: Vec<Link>,
}

struct SocialLink {
    icon: Cow<'static, str>,
    display_text: String,
}

impl Component for SocialLink {
    type Message = ();
    type Properties = SocialLinkProps;

    fn create(props: Self::Properties, _link: ComponentLink<Self>) -> Self {
        let icon = match props.type_ {
            SocialLinkType::Instagram => Cow::Borrowed(include_str!("../../assets/instagram-logo.svg")),
            SocialLinkType::Facebook => Cow::Borrowed(include_str!("../../assets/facebook-logo.svg")),
            SocialLinkType::Twitter => Cow::Borrowed(include_str!("../../assets/twitter-logo.svg")),
            SocialLinkType::GitHub => Cow::Borrowed(include_str!("../../assets/github-logo.svg")),
        };
        let display_text = props.type_.to_string().chars().enumerate().map(|(i, c)| {
            if i == 0 {
                c.to_uppercase().next().unwrap()
            } else {
                c
            }
        }).collect();
        Self { icon, display_text }
    }

    fn update(&mut self, _msg: Self::Message) -> ShouldRender {
        false
    }

    fn change(&mut self, props: Self::Properties) -> ShouldRender {
        let icon = match props.type_ {
            SocialLinkType::Instagram => Cow::Borrowed(include_str!("../../assets/instagram-logo.svg")),
            SocialLinkType::Facebook => Cow::Borrowed(include_str!("../../assets/facebook-logo.svg")),
            SocialLinkType::Twitter => Cow::Borrowed(include_str!("../../assets/twitter-logo.svg")),
            SocialLinkType::GitHub => Cow::Borrowed(include_str!("../../assets/github-logo.svg")),
        };
        let display_text = props.type_.to_string().chars().enumerate().map(|(i, c)| {
            if i == 0 {
                c.to_uppercase().next().unwrap()
            } else if c.is_uppercase() {
                format!(" {}", c)
            } else {
                c.to_string()
            }
        }).collect::<String>();
        self.props = props;
        self.icon = icon;
        self.display_text = display_text;
        true
    }
           
            
#[derive(Debug)]
pub struct LinkProps {
    pub href: String,
    pub text: ReactNode,
}

#[derive(Debug)]
pub struct LinkSubsectionProps {
    pub title: String,
    pub links: Vec<LinkProps>,
}

#[derive(Debug)]
pub struct SocialLinkProps {
    pub r#type: String,
}

const INSTAGRAM_ICON: &str = "assets/instagram-logo.svg";
const FACEBOOK_ICON: &str = "assets/facebook-logo.svg";
const TWITTER_ICON: &str = "assets/twitter-logo.svg";
const GITHUB_ICON: &str = "assets/github-logo.svg";

const ICONS: &str = "icons";

const INSTAGRAM_TYPE: &str = "instagram";
const FACEBOOK_TYPE: &str = "facebook";
const TWITTER_TYPE: &str = "twitter";
const GITHUB_TYPE: &str = "github";

const DISPLAY_TEXT_KEY: &str = "displayText";
const ICON_KEY: &str = "icon";

const FOOTER_TEXT_KEY: &str = "Made with";
const TEAM_NAMES: &str = "Hack4Impact UIUC & SECS teams!";

const MAIL_TO_LINK: &str = "mailto:uiuc.secs@gmail.com";

const ARROW_UP_RIGHT_ICON_SIZE: u32 = 5;
const IMAGE_SIZE: u32 = 5;

fn get_icon(type_str: &str) -> &'static str {
    match type_str {
        INSTAGRAM_TYPE => INSTAGRAM_ICON,
        FACEBOOK_TYPE => FACEBOOK_ICON,
        TWITTER_TYPE => TWITTER_ICON,
        GITHUB_TYPE => GITHUB_ICON,
        _ => "",
    }
}

fn create_social_link_display_text(type_str: &str) -> String {
    let mut display_text = type_str.to_owned();
    display_text[..1].make_ascii_uppercase();
    display_text
}

fn social_link(props: SocialLinkProps) -> ReactNode {
    let icon = get_icon(&props.r#type);
    let display_text = create_social_link_display_text(&props.r#type);

    react::html!(
        <span class="flex">
            <Image
                class="mr-2 w-IMAGE_SIZE hover:text-inherit"
                src={icon}
                alt=format!("{} logo", &props.r#type)
                width=IMAGE_SIZE
                height=IMAGE_SIZE
            />
            {display_text}
        </span>
    )
}

fn link_subsection(props: LinkSubsectionProps) -> ReactNode {
    let links = props.links.into_iter().map(|link| {
        react::html!(
            <a
                key={link.href}
                class="mb-5 w-fit text-sm transition duration-500 hover:text-clementine"
                href={link.href}
            >
                {link.text}
            </a>
        )
    });

    react::html!(
        <div class="w-1/3">
            <h3 class="text-xl">{props.title}</h3>
            <div class="mt-8 flex flex-col">
                {links.collect::<Vec<_>>()}
            </div>
        </div>
    )
}

fn main() {
    fn footer() {
        html! {
            <footer>
                <div class="bg-darkTeal p-10 text-white">
                    <div class="flex flex-wrap">
                        <div class="w-1/2 pl-14">
                            <CapitalizedTitle
                                center=false
                                xSpacing="space-x-1"
                                textSize="text-xl"
                                paddingTop="pt-0"
                            />

                            <div class="mb-4">
                                <p class="mt-8 text-sm">Can’t find what you are looking for?</p>
                                <p class="text-sm">Contact us through email to get in touch!</p>
                            </div>

                            <a class="bg-red text-clementine" href="mailto:uiuc.secs@gmail.com">
                                {"uiuc.secs@gmail.com"}
                            </a>
                        </div>

                        <div class="flex w-1/2">
                            {link_subsection(
                                "About us",
                                &[
                                    (
                                        "https://www.secsillinois.org/",
                                        html! {
                                            <span class="flex underline underline-offset-4">
                                                {"SECS "}
                                                <ArrowUpRightIcon class="ml-1 w-5" />
                                            </span>
                                        }
                                    ),
                                    (
                                        "https://uiuc.hack4impact.org/",
                                        html! {
                                            <span class="flex underline underline-offset-4">
                                                {"Hack4Impact UIUC "}
                                                <ArrowUpRightIcon class="ml-1 w-5" />
                                            </span>
                                        }
                                    ),
                                ]
                            )}
                            {link_subsection(
                                "Follow SECS",
                                &[
                                    (
                                        "https://www.instagram.com/secsillinois/",
                                        html!{<SocialLink type="instagram" />}
                                    ),
                                    (
                                        "https://twitter.com/SECSillinois",
                                        html!{<SocialLink type="twitter" />}
                                    ),
                                    (
                                        "https://www.facebook.com/SECSillinois",
                                        html!{<SocialLink type="facebook" />}
                                    ),
                                ]
                            )}
                            {link_subsection(
                                "Follow Hack4Impact UIUC",
                                &[
                                    (
                                        "https://www.instagram.com/hack4impactuiuc/",
                                        html!{<SocialLink type="instagram" />}
                                    ),
                                    (
                                        "https://github.com/hack4impact-uiuc",
                                        html!{<SocialLink type="github" />}
                                    ),
                                    (
                                        "https://www.facebook.com/hack4impact",
                                        html!{<SocialLink type="facebook" />}
                                    ),
                                ]
                            )}
                        </div>
                    </div>
                </div>

                <div class="flex bg-lightBlue py-3 pl-24 text-sm">
                    {"Made with "}
                    <HeartIcon class="mx-2 w-5" />
                    {" by the Hack4Impact UIUC & SECS teams!"}
                </div>
            </footer>
        }
    }
}
