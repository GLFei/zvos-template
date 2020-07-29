import Vue from 'vue'
import {
    Pagination,
    Dialog,
    Autocomplete,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Input,
    InputNumber,
    Radio,
    RadioGroup,
    RadioButton,
    Checkbox,
    CheckboxButton,
    CheckboxGroup,
    Switch,
    Select,
    Option,
    OptionGroup,
    Button,
    ButtonGroup,
    Table,
    TableColumn,
    DatePicker,
    TimeSelect,
    TimePicker,
    Popover,
    Tooltip,
    Breadcrumb,
    BreadcrumbItem,
    Form,
    FormItem,
    Tabs,
    TabPane,
    Tag,
    Tree,
    Alert,
    Slider,
    Icon,
    Row,
    Col,
    Upload,
    Progress,
    Spinner,
    Badge,
    Card,
    Rate,
    Steps,
    Step,
    Carousel,
    Scrollbar,
    CarouselItem,
    Collapse,
    CollapseItem,
    Cascader,
    ColorPicker,
    Transfer,
    Container,
    Header,
    Aside,
    Main,
    Footer,
    CollapseTransition
} from 'element-ui';

/*import Pagination from "element-ui/packages/pagination";
import Dialog from "element-ui/packages/dialog";
import Autocomplete from "element-ui/packages/autocomplete";
import Dropdown from "element-ui/packages/dropdown";
import DropdownMenu from "element-ui/packages/dropdown-menu";
import DropdownItem from "element-ui/packages/dropdown-item";
import Menu from "element-ui/packages/menu";
import Submenu from "element-ui/packages/submenu";
import MenuItem from "element-ui/packages/menu-item";
import MenuItemGroup from "element-ui/packages/menu-item-group";
import Input from "element-ui/packages/input";
import InputNumber from "element-ui/packages/input-number";
import Radio from "element-ui/packages/radio";
import RadioGroup from "element-ui/packages/radio-group";
import RadioButton from "element-ui/packages/radio-button";
import Checkbox from "element-ui/packages/checkbox";
import CheckboxButton from "element-ui/packages/checkbox-button";
import CheckboxGroup from "element-ui/packages/checkbox-group";
import Switch from "element-ui/packages/switch";
import Select from "element-ui/packages/select";
import Option from "element-ui/packages/option";
import OptionGroup from "element-ui/packages/option-group";
import Button from "element-ui/packages/button";
import ButtonGroup from "element-ui/packages/button-group";
import Table from "element-ui/packages/table";
import TableColumn from "element-ui/packages/table-column";
import DatePicker from "element-ui/packages/date-picker";
import TimeSelect from "element-ui/packages/time-select";
import TimePicker from "element-ui/packages/time-picker";
import Popover from "element-ui/packages/popover";
import Tooltip from "element-ui/packages/tooltip";
import Breadcrumb from "element-ui/packages/breadcrumb";
import BreadcrumbItem from "element-ui/packages/breadcrumb-item";
import Form from "element-ui/packages/form";
import FormItem from "element-ui/packages/form-item";
import Tabs from "element-ui/packages/tabs";
import TabPane from "element-ui/packages/tab-pane";
import Tag from "element-ui/packages/tag";
import Tree from "element-ui/packages/tree";
import Alert from "element-ui/packages/alert";
import Slider from "element-ui/packages/slider";
import Icon from "element-ui/packages/icon";
import Row from "element-ui/packages/row";
import Col from "element-ui/packages/col";
import Upload from "element-ui/packages/upload";
import Progress from "element-ui/packages/progress";
import Spinner from "element-ui/packages/spinner";
import Badge from "element-ui/packages/badge";
import Card from "element-ui/packages/card";
import Rate from "element-ui/packages/rate";
import Steps from "element-ui/packages/steps";
import Step from "element-ui/packages/step";
import Carousel from "element-ui/packages/carousel";
import Scrollbar from "element-ui/packages/scrollbar";
import CarouselItem from "element-ui/packages/carousel-item";
import Collapse from "element-ui/packages/collapse";
import CollapseItem from "element-ui/packages/collapse-item";
import Cascader from "element-ui/packages/cascader";
import ColorPicker from "element-ui/packages/color-picker";
import Transfer from "element-ui/packages/transfer";
import Container from "element-ui/packages/container";
import Header from "element-ui/packages/header";
import Aside from "element-ui/packages/aside";
import Main from "element-ui/packages/main";
import Footer from "element-ui/packages/footer";
import CollapseTransition from "element-ui/src/transitions/collapse-transition";*/

const components = [
    Pagination,
    Dialog,
    Autocomplete,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Input,
    InputNumber,
    Radio,
    RadioGroup,
    RadioButton,
    Checkbox,
    CheckboxButton,
    CheckboxGroup,
    Switch,
    Select,
    Option,
    OptionGroup,
    Button,
    ButtonGroup,
    Table,
    TableColumn,
    DatePicker,
    TimeSelect,
    TimePicker,
    Popover,
    Tooltip,
    Breadcrumb,
    BreadcrumbItem,
    Form,
    FormItem,
    Tabs,
    TabPane,
    Tag,
    Tree,
    Alert,
    Slider,
    Icon,
    Row,
    Col,
    Upload,
    Progress,
    Spinner,
    Badge,
    Card,
    Rate,
    Steps,
    Step,
    Carousel,
    Scrollbar,
    CarouselItem,
    Collapse,
    CollapseItem,
    Cascader,
    ColorPicker,
    Transfer,
    Container,
    Header,
    Aside,
    Main,
    Footer,
    CollapseTransition
];

export default {
    install : function(){
        components.forEach(component => {

            const componentName = (component.name).replace(/El/,'Zv');
            // 全局注册组件
            Vue.component(
                componentName,
                component
            )
        })
    }
}

